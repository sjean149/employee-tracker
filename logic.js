const inquirer = require('inquirer');
const Department = require('./models/department');
const Employee = require('./models/employee');
const Role = require('./models/role');

//Original options upon application start
const questions = [
  {
    type: 'list',
    name: 'original',
    message: 'Choose one of the following options: ',
    choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'delete a department', 'delete an employee', 'exit']
  }
];

//Options displayed when user selects 'add a department'
const createDepartment = [
  {
    type: 'input',
    name: 'deptName',
    message: 'Please enter a department name'
  }
]

//Options displayed when user selects 'add a role'
const createRole = [
  {
    type: 'input',
    name: 'roleTitle',
    message: 'Enter a title for this role',
  },
  {
    type: 'input',
    name: 'roleSalary',
    message: 'Enter a salary integer for this role',
  },
  {
    type: 'input',
    name: 'roleDepartment',
    message: 'Enter a department id number for this role',
  }
]

//Questions displayed when user selects 'add a role' to gather Role field data
const createEmployee = [
  {
    type: 'input',
    name: 'firstname',
    message: 'Enter the employees first name',
  },
  {
    type: 'input',
    name: 'lastname',
    message: 'Enter the employees last name',
  },
  {
    type: 'input',
    name: 'role',
    message: 'Enter the employees role id number',
  },
  {
    type: 'input',
    name: 'manager',
    message: 'Lastly, please enter the employees manager id number'
  }
]

/* Questions displayed when user selects 'update employee'. 
The first question identifies the employee by their id and the 
second allows them to select what property they would like to update */
const updateEmployee = [
  {
    type: 'number',
    name: 'employee_id',
    message: 'Enter the id of the employee you\'d like to update',
    // validate: value => {
    //   const pass = !isNaN(value);
    //   return pass || 'Please enter a valid number';
    // }
  },
  {
    type: 'list',
    name: 'property',
    message: 'Which property would you like to update',
    choices: ['first_name', 'last_name', 'role_id', 'manager_id']
  },
  {
    type: 'input',
    name: 'first_name',
    message: 'Enter this employees updated first name',
    when: answers => answers.property === 'first_name',
  },
  {
    type: 'input',
    name: 'last_name',
    message: 'Enter this employees updated last name',
    when: answers => answers.property === 'last_name',
  },
  {
    type: 'input',
    name: 'role_id',
    message: 'Enter this employees updated role_id number',
    when: answers => answers.property === 'role_id',
  },
  {
    type: 'input',
    name: 'manager_id',
    message: 'Enter this employees updated manager_id',
    when: answers => answers.property === 'manager_id',
  }
]

const deleteDepartment = [
  {
    type: 'input',
    name: 'departmentName',
    message: 'What is the name of the department you would like to delete?'
  }
]

const deleteEmployee = [
  {
    type: 'input',
    name: 'id',
    message: 'Enter the employee id of the person to be deleted.'
  }
]

function mainMenu() {
  inquirer.prompt(questions).then(answer => {
    handleUserInput(answer.original);

  }).catch(error => {
    console.error("Something went wrong:", error);
  });
}

//function contains switch which calls necessary classes based on user input
async function handleUserInput(answers) {

  switch (answers) {
    case 'view all departments':
      console.log(`switch for dept`)
      await Department.view();
      mainMenu();
      break;
    case 'view all roles':
      await Role.view();
      mainMenu();
      break;
    case 'view all employees':
      await Employee.view();
      mainMenu();
      break;
    case 'add a department':
      await inquirer.prompt(createDepartment).then(answers => {
        Department.input(answers.deptName);
      })
      mainMenu();
      break;
    case 'add a role':
      await inquirer.prompt(createRole).then(answers => {
        Role.input(answers.roleTitle, answers.roleSalary, answers.roleDepartment);
      })
      mainMenu();
      break;
    case 'add an employee':
      await inquirer.prompt(createEmployee).then(answers => {
        Employee.input(answers.firstname, answers.lastname, answers.role, answers.manager);
      })
      mainMenu();
      break;
    case 'update an employee role':

      await inquirer.prompt(updateEmployee).then(answers => {
        let propertyToUpdate = answers.property;
        let newValue;

        if (propertyToUpdate === 'first_name') {
          newValue = answers.first_name;
        } else if (propertyToUpdate === 'last_name') {
          newValue = answers.role_id;
        } else if (propertyToUpdate === 'role_id') {
          newValue = answers.role_id;
        } else {
          newValue = answers.manager_id;
        }
        Employee.updateEmployee(answers.employee_id, answers.property, newValue);
      })


      mainMenu();
      break;

    case 'delete a department':
      await inquirer.prompt(deleteDepartment).then(answers => {
        Department.deleteDepartment(answers.departmentName);
      })
      mainMenu();
      break;
    case 'delete an employee':
      await inquirer.prompt(deleteEmployee).then(answers => {
        Employee.deleteEmployee(answers.id);
      })
      mainMenu();
      break;
    case 'exit':
      process.exit();

  }
}

module.exports = { mainMenu, handleUserInput };