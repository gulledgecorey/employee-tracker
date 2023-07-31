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
        if (answers.menu === "add a department") {
            addDepartment()
        }
        if (answers.menu === "add an employee") {
            addEmployee()
        }
        if (answers.menu === "view all employees") {
            viewAllEmployees()
        }
        if (answers.menu === "add a role") {
            addRole()
        }
        if (answers.menu === "view all roles") {
            viewAllRoles()
        }
        if (answers.menu === "update an employee role") {
            updateEmployeeRole()
        }
    })
};
menu()
function viewAllDepartments(){
    db.query(`select * from department`, (err, res )=>{
        if(err){
            console.log(err)
        }
        console.table(res)
        menu()
    })
}

function viewAllRoles(){
    db.query(`select * from role`, (err, res )=>{
        if(err){
            console.log(err)
        }
        console.table(res)
        menu()
    })
}

function viewAllEmployees(){
    db.query(`select * from employee`, (err, res )=>{
        if(err){
            console.log(err)
        }
        console.table(res)
        menu()
    })
}

function addDepartment(){
    inquirer.prompt({
        type: "input",
        message: "enter department name?",
        name: "name"
    })
    .then(answers => {
        
    db.query(`insert into department(name) values ("${answers.name}")`, (err, res )=>{
        if(err){
            console.log(err)
        }
        console.table(res)
        menu()
    })
})
}

function addEmployee(){
    inquirer.prompt([
        {
        type: "input",
        message: "enter first name?",
        name: "first_name"
    },
    {
        type: "input",
        message: "enter last name?",
        name: "last_name"
    },
    {
        type: "input",
        message: "enter role id?",
        name: "role_id"
    },
    {
        type: "input",
        message: "enter manager id (if no manager, enter null)?",
        name: "manager_id"
    },
])
    .then(answers => {
    db.query(`insert into employee (first_name, last_name, role_id, manager_id) values ("${answers.first_name}","${answers.last_name}", ${answers.role_id}, ${answers.manager_id})`, (err, res )=>{
        if(err){
            console.log(err)
        }
        console.table(res)
        menu()
    })
})
}

function addRole(){
    inquirer.prompt([
        {
        type: "input",
        message: "enter title?",
        name: "title"
    },
    {
        type: "input",
        message: "enter salary?",
        name: "salary"
    },
    {
        type: "input",
        message: "department id",
        name: "department_id"
    },

])
    .then(answers => {
    db.query(`insert into role (title, salary, department_id) values ("${answers.title}", ${answers.salary}, ${answers.department_id})`, (err, res )=>{
        if(err){
            console.log(err)
        }
        console.table(res)
        menu()
    })
})
}

function updateEmployeeRole(){
    inquirer.prompt([
        {
        type: "input",
        message: "enter employee id?",
        name: "employee_id"
    },
    {
        type: "input",
        message: "enter role_id?",
        name: "role_id"
    },
    
])
    .then(answers => {
    db.query(`update employee set role_id = ${answers.role_id} where id = ${answers.employee_id} `, (err, res )=>{
        if(err){
            console.log(err)
        }
        console.table(res)
        menu()
    })
})
}