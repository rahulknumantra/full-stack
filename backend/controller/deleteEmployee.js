async function deleteEmployee(req, res) {
    try {
        const deleteUserQuery = 'DELETE FROM employee WHERE empcode = ?';
        const empIdToDelete = req.params.id;
        const response1 = await connectDatabase(deleteUserQuery, [empIdToDelete]);
        if (response1.dbData.affectedRows > 0) {
            console.log(response1.dbData);
            const deleteEmpDetailsQuery = 'DELETE FROM empdetails WHERE empcode = ?';
            const response2 = await connectDatabase(deleteEmpDetailsQuery, [empIdToDelete]);
            if (response2.dbData.affectedRows > 0) {
                return httpResponseSuccessHandler(res, msgCodeJson.ERR004.code, "Deleted successfully");
            }
            else {
                return httpResponseHandlerError(res, msgCodeJson.ERR001.code, "empcode not found in second table");
            }
        } else {
            return httpResponseHandlerError(res, msgCodeJson.ERR001.code, "empcode not found in first table");
        }
    } catch (error) {
        return httpResponseHandlerError(res, msgCodeJson.ERR002.code, `${msgCodeJson.ERR002.msg} :${error}`);
    }

}
module.exports.deleteEmployee = deleteEmployee;