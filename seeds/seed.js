const sequelize = require('../config/connection');
//const { Department, Employee, Role }= require('../models');
const Department = require('../models/department');
const Employee = require('../models/employee');
const Role = require('../models/role');

const employeeData = require('./employeeSeedData.json');
const departmentData = require('./departmentSeedData.json');
const roleData = require('./roleSeedData.json');



const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const department = await Department.bulkCreate(departmentData, {
    individualHooks: true,
    returning: true,
  });

const role = [];
for(let i = 0; i < department.length; i++){
  console.log(`Departments created`, department[i].dataValues.id);
  const newRole = await Role.create({
    department_id: department[i].dataValues.id,
    title: roleData[i].title,
    salary: roleData[i].salary,
  })
  role.push(newRole);
}
 console.log(`role: ${role.length}`);
console.log('employee', employeeData[0].first_name);
  for(let i = 0; i<role.length; i++){
    const newEmployee = await Employee.create({
      role_id: role[i].dataValues.id,
      first_name: employeeData[i].first_name,
      last_name: employeeData[i].last_name,
      manager_id: employeeData[i].manager_id,
    })
  }

  process.exit(0);
};

seedDatabase();
