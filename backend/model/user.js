import sequelize from "../util/database.js";
import { DataTypes } from "sequelize";

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


