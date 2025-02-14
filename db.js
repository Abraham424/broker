const mysql = require('mysql2');
const dbConfig = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'BrokerDatabase',
});
module.exports = dbConfig;