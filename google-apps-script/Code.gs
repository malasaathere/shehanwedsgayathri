const SHEET_NAME = "RSVP";
const TARGET_SPREADSHEET_ID = "1pcfJGg5QJ5vOO7sS3OLgHT4OetwOKjbP3sp4VOkU6tc";

function doPost(e) {
  const data = parseBody(e);
  const spreadsheet = getSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    sheet.appendRow(["Submitted at", "Name", "Telephone", "Guest count"]);
    sheet.setFrozenRows(1);
  }
  sheet.appendRow([data.submittedAt || new Date(), safeCell(data.name), safeCell(data.telephone), Number(data.count) || 1]);
  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return ContentService.createTextOutput(JSON.stringify({ ok: true, sheet: SHEET_NAME })).setMimeType(ContentService.MimeType.JSON);
}

function parseBody(e) {
  if (!e || !e.postData || !e.postData.contents) {
    return {};
  }
  try {
    return JSON.parse(e.postData.contents);
  } catch (error) {
    const params = e.parameter || {};
    return {
      submittedAt: params.submittedAt,
      name: params.name,
      telephone: params.telephone,
      count: params.count,
    };
  }
}

function getSpreadsheet() {
  if (TARGET_SPREADSHEET_ID) return SpreadsheetApp.openById(TARGET_SPREADSHEET_ID);

  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (activeSpreadsheet) return activeSpreadsheet;

  const spreadsheetId = PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID");
  if (spreadsheetId) return SpreadsheetApp.openById(spreadsheetId);

  throw new Error("No spreadsheet found. Set TARGET_SPREADSHEET_ID, bind the script to the Google Sheet, or set SPREADSHEET_ID in Script Properties.");
}

function safeCell(value) {
  const text = String(value || "");
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}
