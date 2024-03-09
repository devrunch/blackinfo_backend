const xlsx = require('xlsx');
const workbook = xlsx.readFile('demo.xlsx');
const sheet_name = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheet_name];
const data = xlsx.utils.sheet_to_json(sheet);
console.log(data[0][' GPS Location Latitude Longitude'])