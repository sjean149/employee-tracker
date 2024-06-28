const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/config');

class Role extends Model{}

Role.init(
    {
        id: {
            type: DataType.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        }, 
        title: {
            type: DataType.VARCHAR(30),
            unique: true,
            allowNull: false,
        },
        salary: {
            type: DataTypes.DECIMAL,
            allowNull: true,
        }, 
        department: {
            type: DataTypes.INTEGER,  
            allowNull: false          
        }


    }
)

module.exports = Role;