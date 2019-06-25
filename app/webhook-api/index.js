var env = process.env.NODE_ENV || 'dev';
var config = require('./config')[env];
const basicAuth = require('express-basic-auth')
var methodOverride = require('method-override')

var express = require('express'),
    app = express(),
    port = process.env.PORT || 8081;
var auth = {}

bodyParser = require('body-parser');


var connection  = require('./api/db');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride())


auth[config.api.user] = config.api.password;

app.use(basicAuth({
    users: auth
}))

var routes = require('./api/routes/webhook'); //importing route
routes(app); //register the route

app.use(function (err, req, res, next) {
    console.error(err)
    res.status(500).json({error:err})
})


app.listen(port);

console.log('Webhook API server started on: ' + port);