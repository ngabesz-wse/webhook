'use strict';
module.exports = function(app) {
    var controller = require('../controllers/webhook');

    // todoList Routes params shopname, event
    app.route('/webhooks')
        .get(controller.list_webhooks_from_shop);


    app.route('/webhook/:id')
        .get(controller.read_webhook)
        .put(controller.update_webhook)
        .delete(controller.delete_webhook);

    app.route('/webhook')
        .post(controller.create_webhook);


};