const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Department extends Model{

    //Retrieves and prints all departments from database into a table
    static async view(){
        try{
           const departmentData = await Department.findAll();
           const departments = departmentData.map(e=>e.get({plain:true}));
           console.table(departments);
        
           return
        } catch (err) {
            console.error(`This is the error with getting the department`, err);
            return err;
        }
    };

    //Creates a new department record using department name
    static async input(departmentName){
        try{
            Department.create({name: departmentName});

        } catch (err) {
            console.error(`A new department could not be added because: `, err)
        }
    }

    //deletes department
    static async deleteDepartment(name){
        console.log(`name ${name}`);
        try{
             Department.destroy({
                where: {
                    name: name,
                }
            })
            console.log(`Department ${name} has been deleted`);
            return
        } catch (err){
            console.error(`This tuple could not be deleted because of ${err}`)
        }
    }
}

Department.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        }, 
        name: {
            type: DataTypes.STRING,             
            allowNull: true,
            unique: true
        }

    }, 
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'department'
    }
);

module.exports = Department;