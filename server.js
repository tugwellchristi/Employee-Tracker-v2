
const { prompt } = require('inquirer');
const mysql = require('mysql2/promise');
const connection = require('./db/connection');

init();

function init() {
    loadMainPrompts();
};

async function loadMainPrompts() {
    try {
        const res = await prompt([
            {
                type: 'list',
                name: 'choice',
                message: 'What would you like to do?',
                choices: [
                    {
                        name: 'View All Employees',
                        value: 'VIEW_EMPLOYEES'
                    },
                    {
                        name: 'Add An Employee',
                        value: 'ADD_EMPLOYEE'
                    },
                    {
                        name: 'View All Roles',
                        value: 'VIEW_ROLES'
                    },
                    {
                        name: 'Add A Role',
                        value: 'ADD_ROLE'
                    },
                    {
                        name: 'Update An Employee Role',
                        value: 'UPDATE_EMPLOYEE_ROLE '
                    },
                    {
                        name: 'View All Departments',
                        value: 'VIEW_DEPARTMENTS'
                    },
                    {
                        name: 'Add A Department',
                        value: 'ADD_DEPARTMENT'
                    },
                ]
            }
        ]);


        let choice = res.choice;
        switch (choice) {
            case 'VIEW_DEPARTMENTS':
                viewDepartments();
                break;
            case 'VIEW_ROLES':
                viewRoles();
                break;
            case 'VIEW_EMPLOYEES':
                viewEmployees();
                break;
            case 'ADD_DEPARTMENT':
                addDepartment();
                break;
            case 'ADD_ROLE':
                addRole();
                break;
            case 'ADD_EMPLOYEE':
                addEmployee();
                break;
            case 'UPDATE_EMPLOYEE_ROLE':
                updateEmployeeRole();
                break;
        }
    } catch (error) {
        console.error('Error prompting user:', error)
    }

}

function viewDepartments() {
    connection.query('SELECT * FROM department', (error, results, fields) => {
        if (error) {
            console.error('Error querying departments:', error);
            return;
        }
        console.log('Viewing All Departments');
        console.table(results);
        loadMainPrompts();
    });

}

function viewRoles() {
    connection.query('SELECT * FROM role', (error, results, fields) => {
        if (error) {
            console.error('Error querying roles:', error);
            return;
        }
        console.log('Viewing All Roles');
        console.table(results);
        loadMainPrompts();
    });

}

function viewEmployees() {
    connection.query('SELECT * FROM employee', (error, results, fields) => {
        if (error) {
            console.error('Error querying employees:', error);
            return;
        }
        console.log('Viewing All Employees');
        console.table(results);
        loadMainPrompts();
    });

}
function addDepartment() {
    console.log('Adding a Department');

    prompt([
        {
            type: 'input',
            name: 'department_name',
            message: 'Enter the name of the new department:',
        }
    ])
        .then(async (answers) => {
            try {
                const [rows, fields] = await connection.promise().query(
                    'INSERT INTO department (department_name) VALUES(?)',
                    [answers.department_name]
                );
                console.log('Department added successfully!');
                loadMainPrompts();
            } catch (error) {
                console.error('Error adding department:', error);
                loadMainPrompts();
            }
        });
}

async function addRole() {
    console.log('Adding a Role');

    const [departments] = await connection.promise().query('SELECT * FROM department');

    const departmentChoices = departments.map((department) => ({
        name: department.department_name,
        value: department.department_id,
    }));

    prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter the name of the new role:',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary for the role:',
        },
        {
            type: 'list',
            name: 'department_id',
            message: 'Enter the department for the new role:',
            choices: departmentChoices,
        },
    ])
        .then(async (answers) => {
            try {
                const [rows, fields] = await connection.promise().query(
                    'INSERT INTO role (title, salary, department_name) VALUES(?, ?, ?, ?)',
                    [answers.title, answers.salary, answers.department_name, answers.department_id]
                );
                console.log('Role added successfully!');
                loadMainPrompts();
            } catch (error) {
                console.error('Error adding role:', error);
                loadMainPrompts();
            }
        });
}

function addEmployee() {
    console.log('Adding an Employee');

    prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter the first name of the new employee',
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter the last name of the new employee',
        },
    ])
        .then(async (answers) => {
            try {
                const [rows, fields] = await connection.promise().query(
                    'INSERT INTO department (department_name) VALUES(?)',
                    [answers.department_name]
                );
                console.log('Department added successfully!');
                loadMainPrompts();
            } catch (error) {
                console.error('Error adding department:', error);
                loadMainPrompts();
            }
        });
}
function addEmployee() {
    console.log('Adding an Employee');
    loadMainPrompts();
};

function updateEmployeeRole() {
    console.log('Updating an Employee Role');
    loadMainPrompts();
};