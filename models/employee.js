const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const { up } = require('inquirer/lib/utils/readline');

class Employee extends Model {

    //Retrieves and prints all employees from database into a table
    static async view(){
        try{
           const employeeData = await Employee.findAll();
           const employees = employeeData.map((e) => e.get({ plain: true }));
            console.table(employees);

           return
        } catch (err) {
            console.error(`This is the error with getting the employees`, err);
            return err;
        }
    };

    //Creates a new employee record
    static async input(first_name, last_name, role_id, manager_id){
        try{
            Employee.create({
                first_name: first_name,
                last_name: last_name,
                role_id: role_id,
                manager_id: manager_id
            });
            
        } catch (err) {
            console.error(`A new employee could not be added because: `, err)
        }
    }

    static async updateEmployee(id, property, updatedProperty){
        try{
           
            const data = {
                [property]: updatedProperty
            }

            Employee.update(data, {where: {id:id}});

        } catch(err) {
            console.error(`A new employee could not be updated because: `, err)

        }
    }

    static async deleteEmployee(id){
        try{
            await Employee.destroy({
                where: {
                    id: id,
                }
            })
            console.log(`Employee ${id} has been deleted`);
            return
        } catch (err){
            console.error(`This tuple could not be deleted because of ${err}`)
        }
    }
}

Employee.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    manager_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
}, 
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'employee'
    }

)

module.exports = Employee;
