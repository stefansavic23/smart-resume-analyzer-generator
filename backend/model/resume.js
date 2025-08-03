import sequelize from "../util/database.js";
import { DataTypes } from "sequelize";

const Resume = sequelize.define(
    'Resume',
    {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            unique: true,
        },
        filename: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        data: {
            type: DataTypes.BLOB('long'),
            allowNull: false
        }
    },
    {
        timestamps: true
    }
);

export default Resume
