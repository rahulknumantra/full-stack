const { connectDatabase } = require("../utils/MySQL/dbConn");

async function getEmpDetails(req, res) {
    try {
        const q = "SELECT emp.empcode, emp.name, emp.surname, empdet.gender, empdet.department, empdet.salary, empdet.age FROM employee.employee as emp INNER JOIN employee.empdetails as empdet ON emp.empcode = empdet.empcode";
        const response = await connectDatabase(q);
        if (response.dbData.length > 0) {
            return httpResponseSuccessHandler(res, msgCodeJson.ERR004.code, msgCodeJson.ERR004.msg, response.dbData);
        } else {
            return httpResponseHandlerError(res, msgCodeJson.ERR001.code, msgCodeJson.ERR001.msg);
        }

    } catch (error) {
        return httpResponseHandlerError(res, msgCodeJson.ERR001.code, `${msgCodeJson.ERR001.msg} :${error}`);
    }

}
module.exports.getEmpDetails = getEmpDetails;