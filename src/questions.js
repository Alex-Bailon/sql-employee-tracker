questions = {
    main: [
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['View All Employees', 'View All Employees by Department', 'View All Employees by Manager', 'Add Employee', 'Remove Employee', 'Update Employee Role', 'Update Employee Manager', 'View All Roles']
        }
    ],
    removeEmployee: [
        {
            type: 'list',
            name: 'removeEmp',
            message: 'Which employee would you like to remove?',
            choices: []
        }
    ],
    addEmployee: [
        {
            type: 'input',
            name: 'first_name',
            message: "What is the employee's first name?" 
        },
        {
            type: 'input',
            name: 'last_name',
            message: "What is the employee's last name?" 
        },
        {
            type: 'list',
            name: 'title',
            message: "What is the employee's role?",
            choices: []
        },
        {
            type: 'list',
            name: 'manager_id',
            message: "Who is the employee's manager?",
            choices: []
        }
    ],
    updateManager: [
        {
            type: 'list',
            name: 'managerUpdate',
            message: "Which employee's manager would you like to update?",
            choices: []
        },
        {
            type: 'list',
            name: 'newManager',
            message: "Which employee would you like to set as manager for selected employee?",
            choices: []
        }
    ],
    updateRole: [
        {
            type: 'list',
            name: 'roleUpdate',
            message: "Which employee's role would you like to update?",
            choices: []
        },
        {
            type: 'list',
            name: 'newRole',
            message: "What is the employee's new role?",
            choices: []
        }
    ],


}

module.exports = {questions}