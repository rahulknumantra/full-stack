async function updateEmployee(req, res) {
    try {
        const updateQueryEmp = "UPDATE employee SET `name` = ?,`surname` = ? WHERE empcode = ?";
        const empIdToUpdate = req.params.id;
        const values =[
            req.body.name,
            req.body.surname
        ]
        const response1 = await connectDatabase(updateQueryEmp,[...values,empIdToUpdate]);
        if (response1.dbData.affectedRows > 0) {
            console.log(response1.dbData);
            const updateQueryEmpDet = "UPDATE empdetails SET `gender` = ?,`department` = ?,`designation` = ?,`salary` = ?,`age` = ?,`contact` = ?,`address` = ? WHERE empcode = ?";
            const values =[
                req.body.gender,
                req.body.department,
                req.body.designation,
                req.body.salary,
                req.body.age,
                req.body.contact,
                req.body.address
            ]
            const response2 = await connectDatabase(updateQueryEmpDet,[...values,empIdToUpdate]);
            if (response2.dbData.affectedRows > 0){
                return httpResponseSuccessHandler(res, msgCodeJson.ERR004.code, msgCodeJson.ERR004.msg);
            }    
        }else{
           return httpResponseHandlerError(res, msgCodeJson.ERR004.code, msgCodeJson.ERR004.msg);
        }

    } catch (error) {
        return httpResponseHandlerError(res, msgCodeJson.ERR002.code, `${msgCodeJson.ERR002.msg} :${error}`);
    }

}
module.exports.updateEmployee = updateEmployee;