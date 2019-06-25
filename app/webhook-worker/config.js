var config = {
    dev: {
        amqp: {
            host: process.env.AMPQ_HOST,
        }
    },
    prod: {
        amqp: {
            host: process.env.AMPQ_HOST,
        }
    }
};
module.exports = config;