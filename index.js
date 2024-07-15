const inquirer = require('inquirer');
const sequelize = require('./config/connection');
const questionLogic  = require('./logic');


sequelize.sync({ force: false })
.catch(err => console.error("Unable to connect to database", err));


console.log(`
  ------------------------------------
  |                                   |
  |                                   |
  |                                   |
  |       EMPLOYEE MANAGER            |
  |       ----------------            |
  |                                   |
  |                                   |
  -------------------------------------
  `);


questionLogic.mainMenu();






