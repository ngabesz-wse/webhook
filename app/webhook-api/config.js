var config = {
    dev: {
        database: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DB
        },
        api:{
            user:process.env.API_USER,
            password:process.env.API_PASSWORD,
        }
    },
    prod: {
        database: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DB
        },
        api:{
            user:process.env.API_USER,
            password:process.env.API_PASSWORD,
        }
    }
};
module.exports = config;