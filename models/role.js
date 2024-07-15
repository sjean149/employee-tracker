const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Role extends Model {

    //Retrieves and prints all roles from database into a table
    static async view() {
        try {
            const roleData = await Role.findAll();
            const roles = roleData.map(e => e.get({ plain: true }));
            console.table(roles);

            return
        } catch (err) {
            console.error(`This is the error with getting the employees`, err);
            return err;
        }
    };

    //Creates a new role record
    static async input(title, salary, department) {
        try {
            Role.create({
                title: title,
                salary: salary,
                department_id: department
            });
        } catch (err) {
            console.error(`A new role could not be added because: `, err)
        }

    }
}

Role.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        salary: {
            type: DataTypes.DECIMAL,
            allowNull: true,
        },
        department_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }


    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'role'
    }

)

module.exports = Role;