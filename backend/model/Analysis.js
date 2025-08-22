import sequelize from "../util/database.js";
import { DataTypes } from "sequelize";

const Analysis = sequelize.define(
    'Analysis',
    {
        id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
        },
        filename: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        aiData: {
            type: DataTypes.BLOB('long'),
            allowNull: true
        }
    },
    {
        timestamps: true
    }
);

export default Analysis
