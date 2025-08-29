import sequelize from "../util/database.js";
import { DataTypes } from "sequelize";

const Analysis = sequelize.define(
    'Analysis',
    {
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
