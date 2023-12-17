// Import mysql 
const mysql = require('mysql2');

// Create a connection to MYSQL database
const connection = mysql.createConnection(
    {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'employee_manager_db'
    });

connection.connect((err) => {
    if (err) throw err;
    console.log(`Connected to the employee_manager_db database.`);
});

module.exports = connection;
