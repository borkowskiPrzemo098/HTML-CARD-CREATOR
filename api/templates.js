/**
 * HTML Card Creator — backend wspólnych szablonów (Vercel + GitHub).
 *
 * Jedyny sekret używany tu to zmienna środowiskowa GITHUB_TOKEN (ustawiana
 * w panelu Vercel, NIGDY w kodzie strony) — fine-grained Personal Access
 * Token z uprawnieniem "Contents: Read and write" ograniczonym TYLKO do
 * tego jednego repozytorium. Patrz vercel-backend/README.md.
 *
 * Dane szablonów trzymane są w pliku templates/index.json w tym repo —
 * każdy zapis to zwykły commit, więc historia jest widoczna w GitHubie.
 */

const OWNER = 'borkowskiPrzemo098';
const REPO = 'HTML-CARD-CREATOR';
const FILE_PATH = 'templates/index.json';
const BRANCH = 'main';

function ghHeaders() {
  return {
    'Authorization': 'Bearer ' + process.env.GITHUB_TOKEN,
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'html-card-creator'
  };
}

async function readIndex() {
  const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_PATH}?ref=${BRANCH}`;
  const r = await fetch(url, { headers: ghHeaders() });
  if (r.status === 404) return { items: [], sha: null };
  if (!r.ok) throw new Error('github read failed: ' + r.status + ' ' + (await r.text()));
  const data = await r.json();
  const content = Buffer.from(data.content, 'base64').toString('utf-8');
  let items = [];
  try { items = JSON.parse(content); } catch (e) { items = []; }
  return { items, sha: data.sha };
}

async function writeIndex(items, sha, message) {
  const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`;
  const body = {
    message: message,
    content: Buffer.from(JSON.stringify(items, null, 2), 'utf-8').toString('base64'),
    branch: BRANCH
  };
  if (sha) body.sha = sha;
  const r = await fetch(url, { method: 'PUT', headers: ghHeaders(), body: JSON.stringify(body) });
  if (!r.ok) {
    const t = await r.text();
    const err = new Error('github write failed: ' + r.status + ' ' + t);
    err.status = r.status;
    throw err;
  }
  return r.json();
}

// wykonuje fn (które samo odpowiada przez res), z jednym ponownym podejściem
// jeśli readIndex/writeIndex trafi na konflikt równoczesnego zapisu (409)
async function withRetry(fn) {
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      await fn();
      return;
    } catch (err) {
      if (attempt === 0 && err.status === 409) continue;
      throw err;
    }
  }
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(204).end(); return; }

  if (!process.env.GITHUB_TOKEN) {
    res.status(500).json({ ok: false, error: 'GITHUB_TOKEN nie jest ustawiony w zmiennych środowiskowych Vercel.' });
    return;
  }

  try {
    if (req.method === 'GET' && req.query.action === 'list') {
      const { items } = await readIndex();
      res.status(200).json({ ok: true, items });
      return;
    }

    if (req.method === 'POST') {
      let body = req.body;
      if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
      body = body || {};

      if (body.action === 'save') {
        if (!body.name || !body.tplId) {
          res.status(400).json({ ok: false, error: 'Brak nazwy lub typu szablonu.' });
          return;
        }
        await withRetry(async () => {
          const { items, sha } = await readIndex();
          const id = 'tpl_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
          const savedAt = new Date().toISOString();
          items.push({ id, name: String(body.name).slice(0, 200), savedAt, tplId: body.tplId, state: body.state });
          await writeIndex(items, sha, 'Zapisz szablon: ' + body.name);
          res.status(200).json({ ok: true, id, savedAt });
        });
        return;
      }

      if (body.action === 'rename') {
        if (!body.id || !body.name) {
          res.status(400).json({ ok: false, error: 'Brak id lub nowej nazwy.' });
          return;
        }
        await withRetry(async () => {
          const { items, sha } = await readIndex();
          const item = items.find(function (x) { return x.id === body.id; });
          if (!item) { res.status(404).json({ ok: false, error: 'Nie znaleziono szablonu.' }); return; }
          item.name = String(body.name).slice(0, 200);
          await writeIndex(items, sha, 'Zmień nazwę szablonu: ' + item.name);
          res.status(200).json({ ok: true });
        });
        return;
      }

      if (body.action === 'delete') {
        if (!body.id) {
          res.status(400).json({ ok: false, error: 'Brak id.' });
          return;
        }
        await withRetry(async () => {
          const { items, sha } = await readIndex();
          const idx = items.findIndex(function (x) { return x.id === body.id; });
          if (idx === -1) { res.status(200).json({ ok: true }); return; } // już nie istnieje — nic do zrobienia
          const removed = items.splice(idx, 1)[0];
          await writeIndex(items, sha, 'Usuń szablon: ' + removed.name);
          res.status(200).json({ ok: true });
        });
        return;
      }

      res.status(400).json({ ok: false, error: 'Nieznana akcja.' });
      return;
    }

    res.status(400).json({ ok: false, error: 'Nieobsługiwane żądanie.' });
  } catch (err) {
    res.status(500).json({ ok: false, error: String((err && err.message) || err) });
  }
};
