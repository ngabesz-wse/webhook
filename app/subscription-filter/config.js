var config = {
    dev: {
        amqp: {
            host: process.env.AMPQ_HOST,
        },
        api:{
            user:process.env.API_USER,
            password:process.env.API_PASSWORD,
            host:process.env.API_HOST,
            port:process.env.API_HOST
        }
    },
    prod: {
        amqp: {
            host: process.env.DB_HOST,
        },
        api:{
            user:process.env.API_USER,
            password:process.env.API_PASSWORD,
            host:process.env.API_HOST,
            port:process.env.API_PORT
        }
    }
};
module.exports = config;