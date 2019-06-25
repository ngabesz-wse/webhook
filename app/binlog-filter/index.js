'use strict';

var amqp = require('amqp');
var config = require('./config.js');
var TableFilter = require('./table-filter');
var tf = new TableFilter(config.tables);


var connection = amqp.createConnection({ host: config.amqp.host });

console.log('waiting for messages!');

connection.on('error', function(e) {
    console.log("Error from amqp: ", e);
});

connection.on('ready', function () {

    connection.queue(config.amqp.queue, function (q) {

        q.bind(config.amqp.exchange, '*');

        q.subscribe(function (message) {

            var d = JSON.parse(message.data);
console.log(d);
            if(tf.has(d.table)){

                var hook = {
                    shopname:d.database,
                    event:d.table+'.'+d.type,
                    time:d.ts,
                    id:d.data.id,
                }

                var publisher = connection.exchange('events',{
                    type:'fanout',
                    durable:true,
                    autoDelete:false
                },function (ex) {

                    var erri = ex.publish('*',JSON.stringify(hook),{},function (err) {
                        console.log(err)
                    })

                })
            }

        });
    });
});

process.on('SIGINT', function() {
    conection.disconnect();
    process.exit();
});
