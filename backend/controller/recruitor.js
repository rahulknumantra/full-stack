async function recruitor(req, res) {
    try {
        const q1 = "INSERT INTO recruitor (`naukri_ID`,`name` ,`skills`,`contact_details`,`address`,`experiance`,`previous_jobs`,`notice_period`,`salary_expectations`,`remarks`) VALUES (?)";
        const values =[
            req.body.naukri_ID,
            req.body.name,
            req.body.skills,
            req.body.contact_details,
            req.body.address,
            req.body.experiance,
            req.body.previous_jobs,
            req.body.notice_period,
            req.body.salary_expectations,
            req.body.remarks,
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
module.exports.recruitor = recruitor;