const xlsx = require("xlsx")

const workbook = xlsx.readFile("ThoiKhoaBieuSinhVien.xls")
const workSheet = workbook.Sheets["ThoiKhoaBieuSV"]

console.log(workSheet);