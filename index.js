const mysql = require("mysql");
const inquirer = require('inquirer')
const cTable = require('console.table');
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
    inquirer.prompt(questions.main).then(res => {
      const actions = {
        'View All Departments': function(){
          employee.getAllDepartments()
          setTimeout(ask, 200)
        },
        'View All Roles': function(){
          employee.getAllRoles()
          setTimeout(ask, 200)
        },
        'View All Employees': function(){
          employee.getAllEmployees()
          setTimeout(ask, 200)
        },
        'Remove Role': function(){
          connection.query('SELECT title FROM role', function(err, res){
            if(err) {
              console.log('Error!')
              console.log(err)
            }
            else {
              // console.log(res)
              console.log('Query successful.')
              let roles = []
              res.forEach(element => {
                roles.push(element.title)
              });
              questions.removeRole[0].choices = roles
              inquirer.prompt(questions.removeRole).then(res => {
                employee.deleteRole(res.removeRole)
                setTimeout(ask, 200)
              })
            }
          })
        }, 
        'Remove Department': function(){
          connection.query('SELECT name FROM department', function(err, res){
            if(err) {
              console.log('Error!')
              console.log(err)
            }
            else {
              // console.log(res)
              console.log('Query successful.')
              let depart = []
              res.forEach(element => {
                depart.push(element.name)
              });
              questions.removeDepartment[0].choices = depart
              inquirer.prompt(questions.removeDepartment).then(res => {
                employee.deleteDepartment(res.removeDepartment)
                setTimeout(ask, 200)
              })
            }
          })
        },
        'Add Department': function(){
          inquirer.prompt(questions.addDepartment).then(res => {
            employee.addDepartment(res)
            setTimeout(ask, 200)
          })
        }


      }
      actions[res.action]()
    })
  }
  ask()
});