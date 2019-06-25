'use strict';

var database  = require('../db');

exports.list_webhooks_from_shop = function(req, res) {

    var sql = ["1"];

    if (req.query.shopname){
        sql.push('shopname="'+req.query.shopname+'"');
    }

    if (req.query.event){
        sql.push('event="'+req.query.event+'"');
    }

    if (sql.length > 0){
        sql = sql.join(' AND ')
    }

    database.query('SELECT * FROM webhooks WHERE '+sql , function (error, results, fields) {
        res.json(results);
    });
};


exports.create_webhook = function(req, res) {

    database.query('INSERT INTO webhooks (name,event,endpoint,app_id,shopname) VALUES ("'+req.body.name+'","'+req.body.event+'","'+req.body.endpoint+'","'+req.body.app_id+'","'+req.body.shopname+'")', function (err, resu) {
        if (err) throw err;

        database.query('SELECT * FROM webhooks WHERE id="'+resu.insertId+'"', function (error, results, fields) {
            if (error) throw error;
            res.json(results);
        });
    });

};


exports.read_webhook = function(req, res) {
    database.query('SELECT * FROM webhooks WHERE id="'+req.params.id+'"', function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
};


exports.update_webhook = function(req, res) {

    var sql = 'UPDATE webhooks SET '

    if ('name' in req.body) {
        sql += ' name ="' + req.body.name +'"'
    }

    if ('event' in req.body) {
        sql += ', event ="' + req.body.event +'"'
    }

    if ('endpoint' in req.body) {
        sql += ', endpoint ="' + req.body.endpoint +'"'
    }

    if ('app_id' in req.body) {
        sql += ', app_id ="' + req.body.app_id +'"'
    }

    if ('shopname' in req.body) {
        sql += ', shopname ="' + req.body.shopname +'"'
    }

    sql += ' WHERE id="'+req.params.id +'"'

    database.query(sql, function (err, resu) {
        if (err) throw err;

        database.query('SELECT * FROM webhooks WHERE id="'+req.params.id+'"', function (error, results, fields) {
            if (error) throw error;
            res.json(results);
        });
    });

};


exports.delete_webhook = function(req, res) {

    database.query('DELETE FROM webhooks WHERE id="'+req.params.id+'"', function (error, result) {
        if (error) throw error;
        res.json({message: 'webhook deleted'});
    });
};

