'use strict';

var rp = require('request-promise');
var amqp = require('amqp');

var env = process.env.NODE_ENV || 'dev';
var config = require('./config')[env];

var connection = amqp.createConnection({ host: config.amqp.host });

console.log('waiting for messages!');

connection.on('error', function(e) {
    console.log("Error from amqp: ", e);
});

connection.on('ready', function () {

    connection.queue('events', function (q) {
        q.bind('events', '*');

        q.subscribe(function (message) {

            var d = JSON.parse(message.data);
            var url = 'http://'+config.api.user+':'+config.api.password+'@'+config.api.host+':'+config.api.port+'/webhooks?shopname='+d.shopname+'&event='+d.event

            rp(url)
                .then(function (repos) {
                    var webhooks = JSON.parse(repos);

                    if (Object.keys(webhooks).length !== 0) {
                        webhooks.forEach(function (element) {
                            var hook = {
                                shopname: d.shopname,
                                event: d.event,
                                time: d.time,
                                id: d.id,
                                endpoint: element.endpoint
                            }

                            var publisher = connection.exchange('webhook', {
                                type: 'fanout',
                                durable: true,
                                autoDelete: false
                            }, function (ex) {
                                console.log(hook)
                                console.log('sent')
                                var erri = ex.publish('*', JSON.stringify(hook), {}, function (err) {
                                    console.log(err)
                                })

                            })
                        })
                    }
                })
                .catch(function (err) {
                    console.log(err)
                });

        });
    });
});

process.on('SIGINT', function() {
    conection.disconnect();
    process.exit();
});