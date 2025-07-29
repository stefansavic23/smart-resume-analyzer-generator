import { Sequelize, DataTypes } from 'sequelize'
const sequelize = new Sequelize('sqlite::memory:');

const User = sequelize.define(
    'User',
    {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.TEXT
        },
    },
    {
        timestamps: true
    }
);

export default User


