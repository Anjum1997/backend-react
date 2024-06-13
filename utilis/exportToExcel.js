const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

// Function to generate Excel file from JSON data
const generateExcelFromJSON = (jsonFilePath, sheetName = 'Sheet1') => {
  // Read the JSON file
  const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));

  // Convert JSON to worksheet
  const worksheet = xlsx.utils.json_to_sheet(jsonData);

  // Create a new workbook and append the worksheet
  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, worksheet, sheetName);

  // Path to save the Excel file temporarily
  const excelFilePath = path.join(__dirname, '../test','users.xlsx');

  // WRITE TO EXCEL FILE
  xlsx.writeFile(workbook, excelFilePath);

  return excelFilePath;
};

module.exports = generateExcelFromJSON;
