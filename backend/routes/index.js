const express =require ('express');
 const config = require('../config/data/config.json');
const router = express.Router();
const getUrlPrefix = config.app.prefix;

const getAllBooksController = require('../controller/getAllBooks');
const addBookController = require('../controller/addBook');
const getexcelwithcustomController = require('../controller/excelTemplateWithCustom');
const getEmpDetailsController = require('../controller/getEmpDetails');

console.log('getUrlPrefix',getUrlPrefix);

router.get(getUrlPrefix + '/ping',(req,res)=>{
    res.status(200).send("pong");
});

router.get(getUrlPrefix + '/getAllBooks',(req,res)=>{
    getAllBooksController.getAllBooks(req,res)   
});
router.post(getUrlPrefix + '/addBook',(req,res)=>{
    addBookController.addBook(req,res)   
});
router.get(getUrlPrefix + "/excelTemplateDownloadWithCustom", (req, res) => {
    getexcelwithcustomController.excelTemplateWithCustom(req, res);
  });
  router.get(getUrlPrefix + '/getEmpDetails',(req,res)=>{
    getEmpDetailsController.getEmpDetails(req,res)   
});
module.exports = router;