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
    INNER JOIN role ON role.id = employee.id
    INNER JOIN department ON role.department_id = department.id`, callback)
  }
  getAllDepartments() {
    this.connection.query(`SELECT name FROM department`, callback)
  }
  getAllRoles() {
    this.connection.query(`SELECT title, salary FROM role`, callback)
  }
  deleteRole(val) {
    this.connection.query(`DELETE FROM role WHERE title = ?`, val, callback)
  }
  deleteDepartment(val) {
    this.connection.query(`DELETE FROM department WHERE title = ?`, val, callback)
  }
  addDepartment(options) {
    return this.connection.query(`INSERT INTO department SET ?`, options, callback)
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