const excel = require('exceljs');
var fs = require('fs');
const path = require('path');
const sampleTemplatewithCustom = require("../config/excelTemplateWithCustom.json")
const {
    httpResponseHandlerError
  } = require("../services/httpResponseHandler");
async function excelTemplateWithCustom(req, res) {
    try {
        let fileNameExcelTemplate = 'SampleTemplatewithCustom.xlsx';
        let filePathExcelTemplate = path.join(__dirname, `../` + fileNameExcelTemplate);
        let workbookExcelTemplate = new excel.Workbook();
        let worksheetExcelTemplate = workbookExcelTemplate.addWorksheet('User');
        worksheetExcelTemplate.columns = sampleTemplatewithCustom
        workbookExcelTemplate.xlsx.writeFile(fileNameExcelTemplate).then(function () {
            res.download(filePathExcelTemplate, (error) => {
                if (error && res.headersSent) {
                    console.log("error",error);
                    
                    res.send('Issue while downloading the excel template');
                }
                fs.unlink(filePathExcelTemplate, (e) => {
                });
            });
        });
    } catch (error) {
        console.log("error",error);
        httpResponseHandlerError(res, error.code, error.message);
    }

}

module.exports.excelTemplateWithCustom = excelTemplateWithCustom;