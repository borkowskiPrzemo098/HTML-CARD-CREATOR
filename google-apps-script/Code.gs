/**
 * HTML Card Creator — backend wspólnych szablonów.
 * Wklej ten kod do Google Apps Script (patrz README.md w tym folderze).
 *
 * Przechowuje zapisane szablony w arkuszu "Szablony" (tworzy go automatycznie
 * przy pierwszym zapisie). Kolumny: id | name | savedAt | tplId | stateJson
 */

function doGet(e) {
  var action = e && e.parameter && e.parameter.action;
  if (action === 'list') {
    return listTemplates();
  }
  return jsonResponse({ ok: false, error: 'unknown action' });
}

function doPost(e) {
  var body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return jsonResponse({ ok: false, error: 'bad json' });
  }
  if (body.action === 'save') {
    return saveTemplate(body);
  }
  if (body.action === 'delete') {
    return deleteTemplate(body);
  }
  return jsonResponse({ ok: false, error: 'unknown action' });
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Szablony');
  if (!sheet) {
    sheet = ss.insertSheet('Szablony');
    sheet.appendRow(['id', 'name', 'savedAt', 'tplId', 'stateJson']);
  }
  return sheet;
}

function listTemplates() {
  var sheet = getSheet_();
  var data = sheet.getDataRange().getValues();
  var rows = data.slice(1); // pomiń nagłówek
  var items = rows
    .filter(function (r) { return r[0]; })
    .map(function (r) {
      return { id: r[0], name: r[1], savedAt: r[2], tplId: r[3], state: r[4] };
    });
  return jsonResponse({ ok: true, items: items });
}

function saveTemplate(body) {
  var sheet = getSheet_();
  var id = Utilities.getUuid();
  var savedAt = new Date().toISOString();
  sheet.appendRow([id, body.name, savedAt, body.tplId, body.state]);
  return jsonResponse({ ok: true, id: id, savedAt: savedAt });
}

function deleteTemplate(body) {
  var sheet = getSheet_();
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] === body.id) {
      sheet.deleteRow(i + 1);
      break;
    }
  }
  return jsonResponse({ ok: true });
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
