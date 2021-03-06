//set all required content
const mysql = require("mysql");
const inquirer = require('inquirer')
const cTable = require('console.table');
let employee = require('./src/queries/employee')
let { questions } = require('./src/questions')
let { intro } = require('./src/consolelog')
//set up connection
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  user: 'root',

  password: 'password',
  database: 'employee_db'
});
//function to display intro console log
intro()
//connect to MySQL
connection.connect(function(err){
  if(err) throw err;
  console.log("connected as id "+ connection.threadId);
  //create employee class
  employee = new employee.Employee(connection)
  //function to ask user what they'd liek to do
  function ask(){
    //at function start have 3 functions to get all info and set fill in question choices
    employee.getEmployeeInfo()
    employee.getRoleInfo()
    employee.getDepartmentInfo()
    //ask user what they would like to do
    inquirer.prompt(questions.main).then(res => {
      //actions var to execute action depending on user response at end of each action function will restart
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
        'View All Employees by Department': function(){
          employee.getEmployeesByDepartment()
          setTimeout(ask, 200)
        },
        'View All Employees by Manager': function(){
          employee.getEmployeesByManager()
          setTimeout(ask, 200)
        },
        'Update Employee Role': function(){
          inquirer.prompt(questions.updateRole).then(res => {
            res['roleUpdate'] = res['roleUpdate'].split('ID: ')[1]
            res['newRole'] = res['newRole'].split('RoleID: ')[1]
            employee.updateRole(res.roleUpdate, {'role_id': res.newRole})
            setTimeout(ask, 200)
          })
        },
        'Update Employee Manager': function(){
          inquirer.prompt(questions.updateManager).then(res => {
            res['managerUpdate'] = res['managerUpdate'].split('ID: ')[1]
            res['manager_id'] = res['manager_id'].split('ID: ')[1]
            employee.updateManager(res.managerUpdate, {'manager_id': res['manager_id']})
            setTimeout(ask, 200)
          })
        },
        'Remove Employee': function(){
          inquirer.prompt(questions.removeEmployee).then(res => {
            res['removeEmp'] = res['removeEmp'].split('ID: ')[1]
            employee.deleteEmployee(res.removeEmp)
            setTimeout(ask, 200)
          })
        },
        'Remove Role': function(){
          inquirer.prompt(questions.removeRole).then(res => {
            res['removeRole'] = res['removeRole'].split("RoleID: ")[1]
            employee.deleteRole(res.removeRole)
            setTimeout(ask, 200)
          })
        }, 
        'Remove Department': function(){
          inquirer.prompt(questions.removeDepartment).then(res => {
            res['removeDepartment'] = res['removeDepartment'].split('DepartmentID: ')[1]
            employee.deleteDepartment(res.removeDepartment)
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
          inquirer.prompt(questions.addRole).then(res => {
            res['department_id'] = res['department_id'].split('DepartmentID: ')[1]
            employee.addRole(res)
            setTimeout(ask, 200)
          })
        },
        'Exit': function(){
          process.exit()
        }

      }
      actions[res.action]()
    })
  }
  ask()
});