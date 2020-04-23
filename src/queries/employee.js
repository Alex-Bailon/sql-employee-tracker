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