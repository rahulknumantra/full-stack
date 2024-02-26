const mysql = require('mysql');
const config = require('../../config/data/config.json');

function connectDatabase(query, value) {
    const deferred = q.defer();
    const db = mysql.createConnection({
        host: config.db.host,
        user: config.db.user,
        password: config.db.password,
        database: config.db.mysql_db
    });
    const pool = mysql.createPool({
        connectionLimit : 10,
        host: config.db.host,
        user: config.db.user,
        password: config.db.password,
        database: config.db.mysql_db,
        timezone : 'UTC+0',
        multipleStatements : true
    })
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("MYSQL CONNECTION ERROR ",err);
            return deferred.reject({ message : "Can't connect to database"})
        }else{
         //when done with connection
         connection.query(query,value, (error,results) =>{
            if(error){
                console.log('error',error);
                connection.destroy();
                return deferred.reject({ message : error})
            }else{
                const dbRes = JSON.parse(JSON.stringify(results));
                connection.destroy();
                deferred.resolve({
                    dbData : dbRes 
                })
            }
         })
        }   
    });
    return deferred.promise
}
module.exports = {connectDatabase}