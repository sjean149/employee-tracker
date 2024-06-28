const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Department extends Model{}

Department.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        }, 
        name: {
            type: DataType.VARCHAR(30),             
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