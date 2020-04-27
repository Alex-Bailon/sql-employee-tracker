const mysql = require('mysql')
//class depending on what the user selects a query will be called from this class.
class Employee {
  constructor(connection) {
    this.connection = connection
  }
  createTables() {
    this.connection.query(`
        CREATE TABLE employee (
            id INT NOT NULL AUTO_INCREMENT,
            first_name VARCHAR(30) NOT NULL,
            last_name VARCHAR(30) NOT NULL,
            role_id INT NOT NULL,
            manager_id INT,
            PRIMARY KEY (id)
        )
        CREATE TABLE role (
          id int NOT NULL AUTO_INCREMENT,
          title varchar(30) NOT NULL,
          salary decimal(10,0) NOT NULL,
          department_id int NOT NULL,
          PRIMARY KEY (id);
        )
        CREATE TABLE department (
          id int NOT NULL AUTO_INCREMENT,
          name varchar(30) NOT NULL,
          PRIMARY KEY (id)
        )
        INSERT INTO employee (id, first_name, last_name, role_id) VALUES ('1', 'No', 'Manager', '0');
    `, callback)
  }
  dropTables() {
    this.connection.query(`
      DROP TABLE employee;
      DROP TABLE role;
      DROP TABLE department;
    `, callback)
  }
  getAllEmployees() {
    //Chris helped me get CONCAT and AS keywords for SQL
    this.connection.query(`
    SELECT e1.id AS 'ID', e1.first_name AS 'First Name', e1.last_name AS 'Last Name', role.title AS 'Role', department.name AS 'Department', role.salary AS 'Salary', CONCAT(e2.first_name, ' ', e2.last_name) AS Manager
    FROM employee e1
    INNER JOIN role ON role.id = e1.role_id
    INNER JOIN department ON role.department_id = department.id
	  JOIN employee e2 WHERE e2.id = e1.manager_id
	  `, callback)
  }
  getEmployeesByDepartment() {
    this.connection.query(`
    SELECT e1.id AS 'ID', e1.first_name AS 'First Name', e1.last_name AS 'Last Name', role.title AS 'Role', department.name AS 'Department', role.salary AS 'Salary', CONCAT(e2.first_name, ' ', e2.last_name) AS Manager
    FROM employee e1
    INNER JOIN role ON role.id = e1.role_id
    INNER JOIN department ON role.department_id = department.id
	  JOIN employee e2 WHERE e2.id = e1.manager_id
    ORDER BY department.id ASC`, callback)
  }
  getEmployeesByManager() {
    this.connection.query(`
    SELECT e1.id AS 'ID', e1.first_name AS 'First Name', e1.last_name AS 'Last Name', role.title AS 'Role', department.name AS 'Department', role.salary AS 'Salary', CONCAT(e2.first_name, ' ', e2.last_name) AS Manager
    FROM employee e1
    INNER JOIN role ON role.id = e1.role_id
    INNER JOIN department ON role.department_id = department.id
	  JOIN employee e2 WHERE e2.id = e1.manager_id
    ORDER BY e1.manager_id ASC`, callback)
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
  //next three functions set questions with employeee/role/department info
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
//callback function to log the res into a table or log err
function callback(err, res) {
  if(err) {
    console.log('Error!')
    console.log(err)
  }
  else {
    console.table(res)
    console.log('Query successful.')
  }
}



module.exports = {
  Employee
}