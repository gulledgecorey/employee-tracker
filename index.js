const mysql = require('mysql2');

const inquirer = require('inquirer');

const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    database: "employee_tracker",
    user: "root",
    password: "#Tiger756"
});

db.connect()
function menu() {
    inquirer.prompt(
        {
            type: "list",
            message: "What would you like to do?",
            name: "menu",
            choices: ["view all departments", "add a department", "add an employee", "view all employees","add a role", "view all roles", "update an employee role"]
        }
    )
    .then(answers => {
        if (answers.menu === "view all departments") {
            viewAllDepartments()
        }
    })
};


