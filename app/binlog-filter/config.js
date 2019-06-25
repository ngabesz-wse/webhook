var config = {
    tables:{
        product:'',
        order:'',
    },
    amqp:{
        host: process.env.AMPQ_HOST,
        queue:'maxwell',
        exchange:'maxwell'
    }
};
module.exports = config;