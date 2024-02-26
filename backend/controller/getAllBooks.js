const { connectDatabase } = require("../utils/MySQL/dbConn");

async function getAllBooks(req, res) {
    try {
        const q = "SELECT * from books";
        const response = await connectDatabase(q);
        if (response.dbData.length > 0) {
            return httpResponseSuccessHandler(res, msgCodeJson.ERR004.code, msgCodeJson.ERR004.msg, response.dbData);
        }else{
           return httpResponseHandlerError(res, msgCodeJson.ERR001.code, msgCodeJson.ERR001.msg);
        }

    } catch (error) {
        return httpResponseHandlerError(res, msgCodeJson.ERR001.code, `${msgCodeJson.ERR001.msg} :${error}`);
    }

}
module.exports.getAllBooks = getAllBooks;