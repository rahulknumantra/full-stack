async function addBook(req, res) {
    try {
        const q = "INSERT INTO books (`title`,`desc`,`price`,`cover`) VALUES (?)";
        const values =[
            req.body.title,
            req.body.desc,
            req.body.price,
            req.body.cover
        ]
        const response = await connectDatabase(q,[values]);
        if (response.dbData.affectedRows > 0) {
            return httpResponseSuccessHandler(res, msgCodeJson.ERR007.code, msgCodeJson.ERR007.msg);
        }else{
           return httpResponseHandlerError(res, msgCodeJson.ERR009.code, msgCodeJson.ERR009.msg);
        }

    } catch (error) {
        return httpResponseHandlerError(res, msgCodeJson.ERR002.code, `${msgCodeJson.ERR002.msg} :${error}`);
    }

}
module.exports.addBook = addBook;