const mysql = require('mysql');
const inquirer = require('inquirer');
const chalk = require('chalk');
const cTable = require('console.table');
const startScreen = ['View all Employees', 'View all Emplyees by Department', 'View all Employees by Manager', 'Add Employee', 'Remove Employee', 'Update Employee Role', 'Update Employee Manager', 'Exit']
const addEmployee = ['What is the first name?', 'What is the last name?', 'What is their role?', 'Who is their manager?']

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'hmtdih2tym!',
    database: 'employee_db'
});

connection.connect((err) => {
    if (err) {
        console.log(chalk.white.bgRed(err));
        return;
    }

    console.log(chalk.green(`Connected to db. ThreadID: ${connection.threadId}`));
    startApp();


})

const startApp = () => {
    inquirer.prompt({
        name: 'menuChoice',
        type: 'list',
        message: 'Select an option',
        choices: startScreen

    }).then((answer) => {
        switch (answer.menuChoice) {
            case 'View all Employees':
                showAll();
                break;
            case 'View all Emplyees by Department':
                showByDept();
                break;
            case 'View all Employees by Manager':
                showByManager();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Remove Employee':
                removeEmployee();
                break;
            case 'Update Employee Role':
                updateRole();
                break;
            case 'Update Employee Manager':
                updateManager();
                break;
            case 'Exit':
                connection.end();
                break;
        }
    })
}



const showAll = () => {
    const query = 'SELECT e.id, e.first_name AS "First Name", e.last_name AS "Last Name", r.title AS "Title", d.department_name AS "Department", r.salary AS "Salary" FROM employees e INNER JOIN roles r ON r.id = e.role_id INNER JOIN departments d ON d.id = r.department_id;';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log(' ');
        console.table(chalk.yellow('All Employees'), res)
        startApp();
    })

}

const showByDept = () => {
    const deptQuery = 'SELECT * FROM departments';
    connection.query(deptQuery, (err, results) => {
        if (err) throw err;

        inquirer.prompt([
            {
                name: 'deptChoice',
                type: 'rawlist',
                choices: function () {
                    let choiceArray = results.map(choice => choice.department_name)
                    return choiceArray;
                },
                message: 'Select a Department to view:'
            }
        ]).then((answer) => {
            let chosenDept;
            for (let i = 0; i < results.length; i++) {
                if (results[i].department_name === answer.deptChoice) {
                    chosenDept = results[i];
                }
            }

            const query = 'SELECT e.id, e.first_name AS "First Name", e.last_name AS "Last Name", r.title AS "Title", d.department_name AS "Department", r.salary AS "Salary" FROM employees e INNER JOIN roles r ON r.id = e.role_id INNER JOIN departments d ON d.id = r.department_id WHERE ?;';
            connection.query(query, { department_name: chosenDept.department_name }, (err, res) => {
                if (err) throw err;
                console.log(' ');
                console.table(chalk.yellow(`All Employees by Department: ${chosenDept.department_name}`), res)
                startApp();
            })
        })
    })
}

const showByManager = () => {
    const mgrQuery = 'SELECT CONCAT (e.first_name," ",e.last_name) AS full_name, r.title, d.department_name FROM employees e INNER JOIN roles r ON r.id = e.role_id INNER JOIN departments d ON d.id = r.department_id WHERE department_name = "Management";'
    connection.query(mgrQuery, (err, results) => {
        if (err) throw err;

        inquirer.prompt([
            {
                name: 'mgr_choice',
                type: 'rawlist',
                choices: function () {
                    let choiceArray = results.map(choice => choice.full_name)
                    return choiceArray;
                },
                message: 'Select a Manager:'
            }
        ]).then((answer) => {
            let chosenItem;
            for (let i = 0; i < results.length; i++) {
                if (results[i].full_name === answer.mgr_choice) {
                    chosenItem = results[i];
                }
            }
            // todo: figure out this query
            const byMgrQuery = '';
        })
    })
}

const addEmployee = () => {

}
