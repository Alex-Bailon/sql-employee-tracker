const mysql = require("../node_modules/mysql");
let employee = require('./queries/employee')
const inquirer = require('../node_modules/inquire')

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  user: 'root',

  password: 'password',
  database: 'employee_db'
});

connection.connect(function(err){
  if(err) throw err;
  console.log("connected as id "+ connection.threadId);
  employee = new employee.Employee(connection)
});