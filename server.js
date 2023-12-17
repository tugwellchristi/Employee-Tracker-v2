
const { prompt } = require('inquirer');

const { query } = require('./db');

init();

async function init() {
    await loadMainPrompts();
}

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
                await viewDepartments();
                break;
            case 'VIEW_ROLES':
                await viewRoles();
                break;
            case 'VIEW_EMPLOYEES':
                await viewEmployees();
                break;
            case 'ADD_DEPARTMENT':
                await addDepartment();
                break;
            case 'ADD_ROLE':
                await addRole();
                break;
            case 'ADD_EMPLOYEE':
                await addEmployee();
                break;
            case 'UPDATE_EMPLOYEE_ROLE':
                await updateEmployeeRole();
                break;
        }
    } catch (error) {
        console.error('Error prompting user:', error)
    }

}

async function viewDepartments() {
    // try {
    //     const rows = await query('SELECT * FROM department');
    //     console.log('Viewing All Departments');
    //     console.table(rows);
    // } catch (error) {
    //     console.error('Error fetching departments:', error);
    // } finally {
        loadMainPrompts();
    }
// }

function viewRoles() {
    console.log('Viewing All Roles');
    loadMainPrompts();
};

function viewEmployees() {
    console.log('Viewing All Employees');
    loadMainPrompts();
};

function addDepartment() {
    console.log('Adding a Department');
    loadMainPrompts();
};

function addRole() {
    console.log('Adding a Role');
    loadMainPrompts();
};

function addEmployee() {
    console.log('Adding an Employee');
    loadMainPrompts();
};

function updateEmployeeRole() {
    console.log('Updating an Employee Role');
    loadMainPrompts();
};