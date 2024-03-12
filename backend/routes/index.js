const express =require ('express');
const multer = require('multer');
const parse = require('csv-parse');

 const config = require('../config/data/config.json');
const router = express.Router();
const getUrlPrefix = config.app.prefix;

const addEmployeeController = require('../controller/addEmployee');
const getEmpDetailsController = require('../controller/getEmpDetails');
const deleteEmployeeController = require('../controller/deleteEmployee');
const updateEmployeeController = require('../controller/updateEmployee');
const getEmpByIdController = require('../controller/getEmpById');
const addEmployeeExcelController = require('../controller/addEmployeeExcel');



console.log('getUrlPrefix',getUrlPrefix);

router.get(getUrlPrefix + '/ping',(req,res)=>{
    res.status(200).send("pong");
});

  router.get(getUrlPrefix + '/getEmpDetails',(req,res)=>{
    getEmpDetailsController.getEmpDetails(req,res)   
});
router.post(getUrlPrefix + '/addEmployee',(req,res)=>{
    addEmployeeController.addEmployee(req,res)   
});
router.delete(getUrlPrefix + '/deleteEmployee/:id',(req,res)=>{
    deleteEmployeeController.deleteEmployee(req,res)   
});
router.put(getUrlPrefix + '/updateEmployee/:id',(req,res)=>{
    updateEmployeeController.updateEmployee(req,res)   
});
router.get(getUrlPrefix + '/getEmpById/:id',(req,res)=>{
    getEmpByIdController.getEmpById(req,res)   
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(getUrlPrefix + '/addEmployeeExcel', upload.single('csvFile'), (req,res)=>{
    addEmployeeExcelController.addEmployeeExcel(req,res)   
});

module.exports = router;