const mysql = require('mysql');
require('dotenv').config()

const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;

const db = mysql.createConnection({
    host: DB_HOST,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME
});

module.exports = db;