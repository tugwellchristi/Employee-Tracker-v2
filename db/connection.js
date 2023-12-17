// Import mysql 
const mysql = require('mysql2/promise');

// Create a connection to MYSQL database
const connection = await mysql.createConnection(
    {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'employee_manager_db'
    });

const query = async (sql, values) => {
    try {
        const [rows] = await connection.execute(sql, values);
        return rows;
    } catch (error) {
        throw error;
    }
};

module.exports = { connection, query };
