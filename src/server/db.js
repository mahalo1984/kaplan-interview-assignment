const mysql = require('promise-mysql');

const config = {
    host: 'localhost',
    port: 3306,
    user: 'assignments',
    password: 'zjrg24!',
    database: 'assignments',
    connectionLimit: 100,
};

const pool = mysql.createPool(config);

module.exports = pool;
