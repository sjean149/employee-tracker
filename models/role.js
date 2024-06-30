const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Role extends Model{}

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