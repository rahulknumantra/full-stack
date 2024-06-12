async function addCandidate(req, res) {
    try {
        const q1 = "INSERT INTO candidate (`company_name`,`job_title` ,`experiance`,`package`,`technologies`,`industry`,`priority`) VALUES (?)";
        const values =[
            req.body.company_name,
            req.body.job_title,
            req.body.experiance,
            req.body.package,
            req.body.technologies,
            req.body.industry,
            req.body.priority.priority
        ]
        console.log(values);
        const response1 = await connectDatabase(q1,[values]);
        if (response1.dbData.affectedRows > 0) {
            console.log(response1.dbData);
            return httpResponseSuccessHandler(res, msgCodeJson.ERR007.code, msgCodeJson.ERR007.msg);
        }else{
           return httpResponseHandlerError(res, msgCodeJson.ERR009.code, msgCodeJson.ERR009.msg);
        }

    } catch (error) {
        return httpResponseHandlerError(res, msgCodeJson.ERR002.code, `${msgCodeJson.ERR002.msg} :${error}`);
    }

}
module.exports.addCandidate = addCandidate;