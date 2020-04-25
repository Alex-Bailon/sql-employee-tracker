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
    employee.getEmployeeInfo()
    employee.getRoleInfo()
    employee.getDepartmentInfo()
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
          inquirer.prompt(questions.removeRole).then(res => {
            employee.deleteRole(res.removeRole)
            setTimeout(ask, 200)
          })
        }, 
        'Remove Department': function(){
          inquirer.prompt(questions.removeDepartment).then(res => {
            employee.deleteDepartment(res)
            setTimeout(ask, 200)
          })
        },
        'Add Employee': function(){
          inquirer.prompt(questions.addEmployee).then(res => {
            res['manager_id'] = res['manager_id'].split("ID: ")[1]
            res['role_id'] = res['role_id'].split("RoleID: ")[1]
            employee.addEmployee(res)
            setTimeout(ask, 200)
          })
        },
        'Add Department': function(){
          inquirer.prompt(questions.addDepartment).then(res => {
            employee.addDepartment(res)
            setTimeout(ask, 200)
          })
        },
        'Add Role': function(){
          connection.query('SELECT * FROM department', function(err, res){
            if(err) {
              console.log('Error!')
              console.log(err)
            }
            else {
              // console.log(res)
              console.log('Query successful.')
              let depart = []
              res.forEach(element => {
                depart.push(`${ element.name } DepartmentID: ${ element.id }`)
              });
              questions.addRole[2].choices = depart
              inquirer.prompt(questions.addRole).then(res => {
                res['department_id'] = res['department_id'].split('Department:ID ')[1]
                employee.addRole(res)
                setTimeout(ask, 200)
              })
            }
          })

        }


      }
      actions[res.action]()
    })
  }
  ask()
});

module.exports = {employee}