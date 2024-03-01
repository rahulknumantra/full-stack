const { connectDatabase } = require("../utils/MySQL/dbConn");

async function getEmpById(req, res) {
    try {
        const empIdToFetchData = req.params.id;
        const q = "SELECT emp.empcode, emp.name, emp.surname, empdet.gender, empdet.department,empdet.designation, empdet.salary, empdet.age,empdet.contact,empdet.address FROM employee.employee as emp INNER JOIN employee.empdetails as empdet ON emp.empcode = empdet.empcode WHERE emp.empcode = ?";
        console.log(q);
        const response = await connectDatabase(q,[empIdToFetchData]);
        if (response.dbData.length > 0) {
            return httpResponseSuccessHandler(res, msgCodeJson.ERR004.code, msgCodeJson.ERR004.msg, response.dbData);
        } else {
            return httpResponseHandlerError(res, msgCodeJson.ERR001.code, msgCodeJson.ERR001.msg);
        }

    } catch (error) {
        return httpResponseHandlerError(res, msgCodeJson.ERR001.code, `${msgCodeJson.ERR001.msg} :${error}`);
    }

}
module.exports.getEmpById = getEmpById;