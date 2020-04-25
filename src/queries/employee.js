const mysql = require('mysql')

class Employee {
  constructor(connection) {
    this.connection = connection
  }
  createTable() {
    this.connection.query(`
        CREATE TABLE employee (
            id INT NOT NULL AUTO_INCREMENT,
            first_name VARCHAR(30) NOT NULL,
            last_name VARCHAR(30) NOT NULL,
            role_id INT NOT NULL,
            manager_id INT,
            PRIMARY KEY (id)
        );
    `, callback)
  }
  dropTable() {
    this.connection.query(`
      DROP TABLE employee
    `, callback)
  }
  getAllEmployees() {
    this.connection.query(`
    SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_id
    FROM employee
    INNER JOIN role ON role.id = employee.role_id
    INNER JOIN department ON role.department_id = department.id`, callback)
  }
  getEmployeesByDepartment() {
    this.connection.query(`
    SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_id
    FROM employee
    INNER JOIN role ON role.id = employee.role_id
    INNER JOIN department ON role.department_id = department.id
    ORDER BY department.id ASC`, callback)
  }
  getEmployeesByManager() {
    this.connection.query(`
    SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_id
    FROM employee
    INNER JOIN role ON role.id = employee.role_id
    INNER JOIN department ON role.department_id = department.id
    ORDER BY manager_id ASC`, callback)
  }
  getAllDepartments() {
    this.connection.query(`SELECT name FROM department`, callback)
  }
  getAllRoles() {
    this.connection.query(`SELECT title, salary FROM role`, callback)
  }
  updateRole(id, options) {
    this.connection.query(`UPDATE employee SET ? WHERE ?`, [options, { id }], callback)
  }
  updateManager(id, options) {
    this.connection.query(`UPDATE employee SET ? WHERE ?`, [options, { id }], callback)
  }
  deleteEmployee(val) {
    this.connection.query(`DELETE FROM employee WHERE id = ?`, val, callback)
  }
  deleteRole(val) {
    this.connection.query(`DELETE FROM role WHERE id = ?`, val, callback)
  }
  deleteDepartment(val) {
    this.connection.query(`DELETE FROM department WHERE id = ?`, val, callback)
  }
  addDepartment(options) {
    return this.connection.query(`INSERT INTO department SET ?`, options, callback)
  }
  addRole(options) {
    return this.connection.query(`INSERT INTO role SET ?`, options, callback)
  }
  addEmployee(options) {
    return this.connection.query(`INSERT INTO employee SET ?`, options, callback)
  }
  getEmployeeInfo(){
    this.connection.query('SELECT first_name, last_name, id FROM employee', function(err, res){
      if (err) throw err
      else {
        let emp = []
        res.forEach(element => {
          emp.push(`${element['first_name']} ${element['last_name']} ID: ${ element.id}`)
        })
        questions.addEmployee[3].choices = emp
        questions.removeEmployee[0].choices = emp
        questions.updateManager[0].choices = emp
        questions.updateManager[1].choices = emp
        questions.updateRole[0].choices = emp
      }
    })  
  }
  getRoleInfo(){
    this.connection.query('SELECT title, id FROM role', function(err, res){
      if (err) throw err
      let roles = []
      res.forEach(role => {
        roles.push(`${ role.title } RoleID: ${ role.id }`)
      })
      questions.addEmployee[2].choices = roles
      questions.removeRole[0].choices = roles
      questions.updateRole[1].choices = roles
    })
  }
  getDepartmentInfo(){
    this.connection.query('SELECT * FROM department', function(err, res){
      if(err) throw err
      let depart = []
      res.forEach(element => {
        depart.push(`${ element.name } DepartmentID: ${ element.id }`)
      });
      questions.removeDepartment[0].choices = depart
      questions.addRole[2].choices = depart
    })
  }

}

function callback(err, res) {
  if(err) {
    console.log('Error!')
    console.log(err)
  }
  else {
    console.log(res)
    console.log('Query successful.')
  }
}



module.exports = {
  Employee
}