const { connectDatabase } = require("../utils/MySQL/dbConn");

async function getEmpDetails(req, res) {
    try {
        const  page = parseInt(req.query.page);
        const  limit = parseInt(req.query.limit);

        const q = "SELECT emp.empcode, emp.name, emp.surname, empdet.gender, empdet.department,empdet.designation, empdet.salary, empdet.age,empdet.contact,empdet.address FROM employee.employee as emp INNER JOIN employee.empdetails as empdet ON emp.empcode = empdet.empcode";
        const response = await connectDatabase(q);
        if (response.dbData.length > 0) {
            let finalResult = await pagination(page,limit,response.dbData)
            return httpResponseSuccessHandler(res, msgCodeJson.ERR004.code, msgCodeJson.ERR004.msg, finalResult);
        } else {
            return httpResponseHandlerError(res, msgCodeJson.ERR001.code, msgCodeJson.ERR001.msg);
        }

    } catch (error) {
        return httpResponseHandlerError(res, msgCodeJson.ERR001.code, `${msgCodeJson.ERR001.msg} :${error}`);
    }

}
async function pagination(page, limit,allData){
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedData = allData.slice(startIndex, endIndex);
    return paginatedData;
}
module.exports.getEmpDetails = getEmpDetails;