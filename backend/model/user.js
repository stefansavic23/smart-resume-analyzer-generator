import sequelize from "../util/database.js";
import { DataTypes } from "sequelize";

const User = sequelize.define(
    'User',
    {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING
        },
    },
    {
        timestamps: true
    }
);

export default User