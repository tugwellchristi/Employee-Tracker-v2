// // Import inquirer package and node library
// const inquirer = require('inquirer'); 
// const { departmentSeeds, employeeSeeds, roleSeeds } = require('./seeds');

// async function main() {
//     //Prompts for department 
//     const departmentAnswers = await inquirer.prompt([
//     {
//         type: 'list',
//         name: 'departmentAction',
//         message: 'What would you like to do?',
//         choices: ['View Departments', 'Add a Department', 'View Roles', 'Add a Role', 'View all Employees', 'Add an Employee', 'Update an Employee'],
//     },
//     {
//         type: 'list', 
//         name: 'departmentView',
//         message: 'What is the name of the department you would like to view?',
//         choices: ['Senior Management', 'Sales', 'Research and Development', 'Assembly', 'Quality Analysis and Testing'],
//     },
//     {
//         type: 'input', 
//         name: 'departmentAdd',
//         message: 'What is the name of the department you would like to add?',
//     },
// ]);
//     // Prompts for role
//     const roleAnswers = await inquirer.prompt([
//     {
//         type: 'list',
//         name: 'roleView', 
//         message: 'What is the name of the role you would like to view?',
//         choices: ['General Manager', 'Production Manager', 'Sales Manager', 'Human Resources Manager', 'Lead Accountant', 'Sales Lead', 'Outside Sales Rep 1', 'Outside Sales Rep 2', 'Inside Sales Rep', 'R&D Engineer 1', 'R&D Engineer 2', 'Assembler 1', 'Assembler 2','Assembler 3', 'Assembler Assistant', 'QC Engineer 1', 'QC Engineer 2'],
//     },
//     {
//         type: 'input',
//         name: 'roleAdd', 
//         message: 'What is the name of the role you would like to add?',
//     },
//     {
//         type: 'input',
//         name: 'roleSalary', 
//         message: 'What is the salary of the role?',
//     },
//     {
//         type: 'list',
//         name: 'roleDepartment', 
//         message: 'Which department will the role belong to?',
//         choice: ['Senior Management', 'Sales', 'Research and Development', 'Assembly', 'Quality Analysis and Testing'],
//     },
// ]);
//     // Prompts for employee
//     const employeeAnswers = await inquirer.prompt([
//         {
//             type: 'list',
//             name: 'employeeView', 
//             message: 'What is the name of the employee you would like to view?',
//             choice: ['James West', 'Ben Horner', 'Sam Johns', 'Marcus Garza', 'Lisa Jones', 'Sarah Smith', 'John Welch', 'Sally Weiss', 'Asher Rhodes', 'Darrel James', 'Alexis Holden', 'Gareth Hudson', 'Evan Foster', 'Florence Colby', 'Isabel Quinn', 'Reyna Garcia', 'Sophie Bell']
//         },
//         {
//             type: 'input',
//             name: 'employeeAdd', 
//             message: 'What is the full (First and Last) name of the employee you would like to add ?',
//         },
//         {
//             type: 'list',
//             name: 'employeeRole', 
//             message: 'What is the role of the new employee?',
//             choices: ['General Manager', 'Production Manager', 'Sales Manager', 'Human Resources Manager', 'Lead Accountant', 'Sales Lead', 'Outside Sales Rep 1', 'Outside Sales Rep 2', 'Inside Sales Rep', 'R&D Engineer 1', 'R&D Engineer 2', 'Assembler 1', 'Assembler 2','Assembler 3', 'Assembler Assistant', 'QC Engineer 1', 'QC Engineer 2'],
//         },
//         {
//             type: 'list',
//             name: 'employeeManager', 
//             message: 'Which manager will the new employee will report to?',
//             choices: ['General Manager', 'Production Manager', 'Sales Manager', 'Human Resources Manager'],
//         },
//     ]);

//     // Call seed functions with provided answers
//     await departmentSeeds([departmentAnswers.departmentAction, departmentAnswers.departmentView, departmentAnswers.departmentAdd]);
//     await roleSeeds([roleAnswers.roleView, roleAnswers.roleAdd, roleAnswers.roleSalary, roleAnswers.roleDepartment]);
//     await employeeSeeds([employeeAnswers.employeeView, employeeAnswers.employeeAdd, employeeAnswers.employeeRole, employeeAnswers.employeeManager]);

//     console.log('Seeding completed');

// }

// // Call the main function
// main();