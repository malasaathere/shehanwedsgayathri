const SHEET_NAME = "RSVP";

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    sheet.appendRow(["Submitted at", "Name", "Telephone", "Guest count"]);
    sheet.setFrozenRows(1);
  }
  sheet.appendRow([data.submittedAt || new Date(), safeCell(data.name), safeCell(data.telephone), Number(data.count) || 1]);
  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
}

function safeCell(value) {
  const text = String(value || "");
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}
