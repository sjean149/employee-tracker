const sequelize = require('../config/connection');
const Employee = require('../models/employee');
const employeeData = require('./employeeSeedData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Employee.bulkCreate(employeeData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
