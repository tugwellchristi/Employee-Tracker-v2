
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

    try {
        const [departments] = await connection.promise().query('SELECT * FROM department');

        const departmentChoices = departments.map((department) => ({
            name: department.department_name,
            value: department.department_id,
        }));


        const answers = await prompt([
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
        ]);

        if (!answers.department_id) {
            console.error('Error: Department ID cannot be null');
            loadMainPrompts();
            return;
        }

        const [rows, fields] = await connection.promise().query(
            'INSERT INTO role (title, salary, department_id) VALUES(?, ?, ?)',
            [answers.title, answers.salary, answers.department_id]
        );

        console.log('Role added successfully!');
        loadMainPrompts();
    } catch (error) {
        console.error('Error adding role:', error);
        loadMainPrompts();
    }
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
        {
            type: 'input',
            name: 'role_id',
            message: 'Enter the role ID of the new employee',
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'Enter the manager ID of the new employee',
        },


    ])
        .then(async (answers) => {
            try {
                const [rows, fields] = await connection.promise().query(
                    'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)',
                    [answers.first_name, answers.last_name, answers.role_id, answers.manager_id]
                );
                console.log('Employee added successfully!');
                loadMainPrompts();
            } catch (error) {
                console.error('Error adding employee:', error);
                loadMainPrompts();
            }
        });
}

function updateEmployeeRole() {
    console.log('Updating an Employee Role');

    prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter the first name of the employee you would like to update:',
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter the last name of the employee you would like to update:',
        },
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to update?',
            choices: [
                {
                    name: 'Update Title',
                    value: 'UPDATE_TITLE'
                },
                {
                    name: 'Update Salary',
                    value: 'UPDATE_SALARY'
                },
                {
                    name: 'Update Department ID',
                    value: 'UPDATE_DEPARTMENT_ID'
                },
            ],
        },
    ])
        .then(async (answers) => {
            const employeeData = {
                first_name: answers.first_name,
                last_name: answers.last_name,
            };

            switch (answers.choice) {
                case 'UPDATE_TITLE':
                    updateEmployeeRoleByData(employeeData, 'title');
                    break;
                case 'UPDATE_SALARY':
                    updateEmployeeRoleByData(employeeData, 'salary');
                    break;
                case 'UPDATE_DEPARTMENT_ID':
                    updateEmployeeRoleByData(employeeData, 'department_id');
                    break;
                default:
                    console.log('Invalid option');
                    loadMainPrompts();
            }
        });
}

function updateEmployeeRoleByData(employeeData, update_type) {
    let updateField, message;
    switch (update_type) {
        case 'title':
            updateField = 'title';
            message = 'Enter the new title:';
            break;
        case 'salary':
            updateField = 'salary';
            message = 'Enter the new salary:';
            break;
        case 'department_id':
            updateField = 'department_id';
            message = 'Enter the new department ID:';
            break;
    }

    prompt([
        {
            type: 'input',
            name: 'new_value',
            message: message,
        },
    ])
        .then(async (answer) => {
            try {
                const [rows, fields] = await connection.promise().query(
                    `UPDATE employee SET ${updateField} = ? WHERE first_name = ? AND last_name = ?`,
                    [answers.new_value, employeeData.first_name, employeeData.last_name]
                );
                console.log('Employee updated successfully!');
                loadMainPrompts();
            } catch (error) {
                console.error('Error updating employee:', error);
                loadMainPrompts();
            }
        });
}