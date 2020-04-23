const mysql = require("mysql");
const inquirer = require('inquirer')
let employee = require('./src/queries/employee')
let { questions } = require('./src/questions')

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

  function ask(){
    inquirer.prompt(questions.main).then(res => {console.log(res)})
  }
  ask()
});