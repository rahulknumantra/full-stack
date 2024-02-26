const express =require ('express');
const cors =require ('cors');
const path =require ('path');
const config = require('./config/data/config');
const indexRouter = require('./routes/index')
const getUrlPrefix = config.app.prefix;
let app = express();

global.q = require('q');
global.config = require('./config/data/config.json');
global._ = require('underscore');
global.msgCodeJson =require('./utils/MsgCode/msgCode');
global.connectDatabase = require('./utils/MySQL/dbConn').connectDatabase
global.httpResponseSuccessHandler = require('./services/httpResponseHandler').httpResponseSuccessHandler
global.httpResponseHandlerError = require('./services/httpResponseHandler').httpResponseHandlerError

app.use(express.json());
app.use(cors())
app.use('/',indexRouter);

// app.use(function(err,req,res,next){
//     res.locals.message= err.message
//     res.locals.error = req.app.get('env') === 'development' ? err : {}
//     res.status(err.status || 500)
// })

/*Server start */
const port = process.env.PORT || config.server.port
const server = app.listen(port)
console.log('Api is running on port',port)
console.log(`try this url http://localhost:${port}${getUrlPrefix}/ping`);

module.exports = app