var mysql=require('mysql');

var env = process.env.NODE_ENV || 'development';
var config = require('../config.js')[env];

var connection = mysql.createConnection({
    host     : config.database.host,
    user     : config.database.user,
    password : config.database.password,
    database : config.database.database
});
connection.connect(function(error){
    if(!!error){
        console.log(error);
    }else{
        console.log('Connected!:)');
    }
});
module.exports = connection;