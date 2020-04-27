### Schema

CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE employee 
(
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id)
);
CREATE TABLE role
(
    id int NOT NULL AUTO_INCREMENT,
    title varchar(30) NOT NULL,
    salary decimal(10,0) NOT NULL,
    department_id int NOT NULL,
    PRIMARY KEY (id);
);
CREATE TABLE department 
(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(30) NOT NULL,
    PRIMARY KEY (id)
);
