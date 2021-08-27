const express = require('express');
const bodyParser = require('body-parser');
const httpContext = require('express-http-context');
const dotenvJSON = require('dotenv-json');
const addRequestId = require('express-request-id')();
const cpuCount = require('os').cpus().length;

console.log(cpuCount);
const env = process.env.NODE_ENV || 'dev';
dotenvJSON({ path: `./config.${env}.json` });

const app = express();
const port = process.env.PORT || 3000;
app.disable('x-powered-by');

app.use(bodyParser.urlencoded({
    extended: true,
}));

app.use(bodyParser.json());
app.get('/', function(req,res){
    res.status(404).json({"not good": "not foo"})
    //let envcheck = process.env.check
   // res.send(envcheck);
});
app.get('*', function(req,res){
    res.status(404).json({"cant access":"cant access"})
} )
app.use(addRequestId);
app.use(httpContext.middleware);

app.listen(port, function () {
    console.log("Listening at the port 3000")
});

module.exports=app;