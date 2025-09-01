import sequelize from "./database.js";
import { DataTypes } from "sequelize";

const Resume = sequelize.define(
    'Resume',
    {
        filename: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        data: {
            type: DataTypes.BLOB('long'),
            allowNull: false
        },
    },
    {
        timestamps: true
    }
);

export default Resume
