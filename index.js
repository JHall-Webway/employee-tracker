const inquirer = require('inquirer');
const db = require('./db/connection');
const cTable = require('console.table');

const startUp = () => {
  console.log(`
                                                                              
  _____              _                        _____            _             
  |   __| _____  ___ | | ___  _ _  ___  ___   | __  | ___  ___ | |_  ___  ___ 
  |   __||     || . || || . || | || -_|| -_|  |    -|| . ||_ -||  _|| -_||  _|
  |_____||_|_|_||  _||_||___||_  ||___||___|  |__|__||___||___||_|  |___||_|  
              |_|          |___|                                            
  `);
  mainMenu();
};


mainMenu = () => {
  inquirer.prompt({
    type: 'list',
    name: 'menu',
    message: 'What would you like to do?',
    choices: [
      'View all departments',
      'View all roles',
      'View All Employees',
      'Add department',
      'Add role',
      'Add employee',
      'Update employee'
    ]
  })
    .then(ans => {
      switch (ans.menu) {
        case 'View all departments':
          viewDepartments();
          break;
        case 'View all roles':
          viewRoles();
          break;
        case 'View All Employees':
          viewEmployees();
          break;
        case 'Add department':
          addDepartment();
          break;
        case 'Add role':
          addRole();
          break;
        case 'Add employee':
          addEmployee();
          break;
        case 'Update employee':

          break;
      };
    });
};

viewDepartments = () => {
  const sql = `SELECT * FROM department`
  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(rows);
    mainMenu();
  })
};

viewRoles = () => {
  const sql = `SELECT role.id, role.title, role.salary, department.department_name
  FROM role
  LEFT JOIN department ON role.department_id=department.id`
  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(rows);
    mainMenu();
  })
}

viewEmployees = () => {
  const sql = `SELECT employee.id, first_name, last_name, role.title, department.department_name, role.salary, manager_id
  FROM ((employee
  INNER JOIN role ON employee.role_id = role.id)
  INNER JOIN department ON role.department_id = department.id)`
  db.query(sql, (err, rows) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(rows);
    mainMenu();
  })
}

addDepartment = () => {
  const sql = `SELECT *
  FROM department`;
  db.promise().query(sql)
    .then(([rows]) => {
      console.table(rows);
      inquirer.prompt({
        type: 'input',
        name: 'newDepartment',
        message: 'Please type in the name of your new department'
      })
        .then(res => {
          const insertSql = `INSERT INTO department (department_name)
          VALUES (?)`;
          const insertParams = [res.newDepartment]
          db.query(insertSql, insertParams, (err) => {
            if (err) {
              console.log(err);
              mainMenu();
            };
            console.log('Department Added!');
            mainMenu();
          });
        });
    })
    .catch(console.log);
}

addRole = () => {
  const sql = `SELECT *
  FROM department`;
  db.promise().query(sql)
    .then(([rows]) => {
      let choiceArr = [];
      rows.map((obj, i) => {
        choiceArr.push(i + 1 + ': ' + obj.department_name)
      });
      inquirer.prompt([
        {
          type: 'input',
          name: 'newRole',
          message: 'Please type in the name of your new role'
        },
        {
          type: 'number',
          name: 'newSalary',
          message: 'Please enter the salary for your new role'
        },
        {
          type: 'list',
          name: 'department',
          message: 'Which department is this role going in?',
          choices: choiceArr
        }
      ])
        .then(res => {
          const insertSql = `INSERT INTO role (title, salary, department_id)
          VALUES (?,?,?)`;
          const insertParams = [res.newRole, res.newSalary, res.department.slice(':')[0]]
          db.query(insertSql, insertParams, (err) => {
            if (err) {
              console.log(err);
              mainMenu();
            };
            console.log('Role Added!');
            mainMenu();
          });
        });
    })
    .catch(console.log);
};

addEmployee = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'employeeFirstName',
      message: 'What is your employees first name?'
    },
    {
      type: 'input',
      name: 'employeeLastName',
      message: 'Please enter your employees last name'
    }
  ])
}
startUp();