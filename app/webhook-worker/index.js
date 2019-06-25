'use strict';

const curl = new (require( 'curl-request' ))();
var amqp = require('amqp');
var env = process.env.NODE_ENV || 'dev';
var config = require('./config')[env];

var connection = amqp.createConnection({ host: config.amqp.host });

connection.on('ready', function () {

    console.log('waiting for messages!');

    connection.queue('webhook', function (q) {
        q.bind('webhook', '*');

        q.subscribe(function (message) {

            var d = JSON.parse(message.data);

            curl
                .setBody(
                    d
                )
                .post(d.endpoint)
                .then(({statusCode, body, headers}) => {
                    console.log(statusCode, body, headers)
                })
                .catch((e) => {
                    console.log(e);
                });

        });
    });
});

process.on('SIGINT', function() {
    conection.disconnect();
    process.exit();
});