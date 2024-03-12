const parse = require('csv-parse');
const mysql = require('mysql2/promise');

async function addEmployeeExcel(req, res) {
    try {
        if (!req.file) {
            return httpResponseHandlerError(res, msgCodeJson.ERR009.code, "No file uploaded");
        }
        const buffer = req.file.buffer;
        const csvString = buffer.toString('utf-8');
        console.log(csvString);
        parse(csvString, { columns: true }, async (err, records) => {
            if (err) {
                console.error('Error parsing CSV data:', err.message);
                return httpResponseHandlerError(res, msgCodeJson.ERR002.code, "Error parsing CSV data");
            }
            try {
                let count = 0;
                let employeeLength = records.length;
                for (const record of records) {
                    // Insert data into table1
                    const q1 = "INSERT INTO employee (`name`,`surname`) VALUES (?)";
                    const values = [
                        record.name,
                        record.surname
                    ]
                    const response1 = await connectDatabase(q1, [values]);
                    if (response1.dbData.affectedRows > 0) {
                        console.log(response1.dbData);
                        const empcode = response1.dbData.insertId;
                        const q2 = "INSERT INTO empdetails (`gender`,`department`,`designation`,`salary`,`age`,`contact`,`empcode`,`address`) VALUES (?)";
                        const values = [
                            record.gender,
                            record.department,
                            record.designation,
                            record.salary,
                            record.age,
                            record.contact,
                            empcode,
                            record.address
                        ]
                        await connectDatabase(q2, [values]);
                    }
                    count++;
                }
                if (employeeLength === count) {
                    return httpResponseSuccessHandler(res, msgCodeJson.ERR007.code, 'CSV data processed and saved successfully.');
                }
            } catch (error) {
                console.error('Error saving data to database:', error.message);
                return httpResponseHandlerError(res, msgCodeJson.ERR009.code, msgCodeJson.ERR009.msg);
            }
        })
    } catch (error) {
        console.error('Error processing CSV data:', error.message);
        return httpResponseHandlerError(res, msgCodeJson.ERR002.code, `${msgCodeJson.ERR002.msg} :${error}`);
    }

}
module.exports.addEmployeeExcel = addEmployeeExcel;