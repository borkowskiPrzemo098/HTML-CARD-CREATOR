# Konfiguracja wspólnych szablonów przez Vercel + GitHub (rekomendowane)

Ten krok robi tylko właściciel repozytorium (Ty), **raz**, ok. 5–10 minut.
Pracownicy niczego nie konfigurują ani się nie logują — po prostu widzą i
edytują zapisane szablony od razu po wejściu na link do strony.

Jak to działa: zapisane szablony trafiają jako plik `templates/index.json`
do tego samego repozytorium GitHub (każdy zapis = zwykły commit, widoczny
w historii). Strona GitHub Pages **czyta** ten plik bezpośrednio z GitHuba
(nie trzeba do tego żadnego logowania). Do **zapisu** potrzebny jest sekretny
token — trzyma go bezpiecznie mała funkcja na Vercelu, nigdy nie trafia do
kodu strony ani do przeglądarki pracownika.

## Krok 1 — token GitHub (dostęp tylko do tego repo)

1. Wejdź na [github.com/settings/tokens?type=beta](https://github.com/settings/tokens?type=beta)
   (Fine-grained personal access tokens).
2. **Generate new token**.
3. **Token name**: np. `html-card-creator-vercel`.
4. **Expiration**: wybierz dowolny okres (np. „No expiration” albo 1 rok —
   jeśli token wygaśnie, zapis szablonów przestanie działać, dopóki nie
   wygenerujesz nowego).
5. **Repository access** → **Only select repositories** → wybierz
   `HTML-CARD-CREATOR`.
6. **Permissions** → **Repository permissions** → znajdź **Contents** →
   ustaw na **Read and write**. Nic więcej nie zaznaczaj.
7. **Generate token** i **skopiuj go od razu** (GitHub pokaże go tylko raz).

## Krok 2 — konto Vercel

1. Wejdź na [vercel.com](https://vercel.com) → **Continue with GitHub**
   (logowanie jednym kliknięciem, bez zakładania osobnego hasła).
2. Zaakceptuj dostęp Vercela do Twojego konta GitHub.

## Krok 3 — import projektu

1. W panelu Vercel: **Add New…** → **Project**.
2. Znajdź i zaimportuj repozytorium **HTML-CARD-CREATOR**.
3. W sekcji **Environment Variables** (jeszcze przed kliknięciem Deploy)
   dodaj:
   - **Key**: `GITHUB_TOKEN`
   - **Value**: token skopiowany w Kroku 1
4. Framework Preset może zostać jako „Other” — nic więcej nie trzeba
   zmieniać.
5. Kliknij **Deploy**. Poczekaj chwilę na zakończenie wdrożenia.

## Krok 4 — podłączenie do strony

1. Po zakończeniu wdrożenia Vercel pokaże domenę, np.
   `https://html-card-creator-xyz.vercel.app`.
2. Adres funkcji API to ta domena + `/api/templates`, np.:
   `https://html-card-creator-xyz.vercel.app/api/templates`
3. Otwórz plik [`index.html`](../index.html) w repozytorium, znajdź linijkę:

   ```js
   var VERCEL_API_URL = '';
   ```

   i wklej tam adres z kroku 2, np.:

   ```js
   var VERCEL_API_URL = 'https://html-card-creator-xyz.vercel.app/api/templates';
   ```

4. Zapisz, zrób `git add`, `git commit`, `git push`.
5. Po chwili (aktualizacja GitHub Pages) przycisk „💾 Zapisz jako szablon”
   oraz lista „Zapisane szablony” zaczną działać dla wszystkich, którzy mają
   link do strony — bez żadnego logowania z ich strony.

## Gdzie sprawdzić zapisane dane

W repozytorium GitHub pojawi się plik `templates/index.json` — każdy zapis
szablonu to nowy commit do tego pliku. Możesz go podejrzeć/edytować ręcznie
bezpośrednio na GitHubie w razie potrzeby.

## Jeśli coś nie działa

- **„Zapisz” zwraca błąd** → sprawdź w panelu Vercel (Project → Settings →
  Environment Variables), czy `GITHUB_TOKEN` jest ustawiony, i czy token nie
  wygasł (Krok 1).
- **Lista się nie ładuje** → sprawdź, czy `VERCEL_API_URL` w `index.html`
  kończy się dokładnie na `/api/templates` i czy nie ma literówki.
- Każda zmiana środowiskowej zmiennej w Vercel wymaga **Redeploy**
  (Project → Deployments → „⋯” przy najnowszym → Redeploy), żeby zaczęła
  obowiązywać.
