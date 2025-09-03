import { Sequelize } from "sequelize";
import { DB_USER, DB, DB_DIALECT, DB_HOST, DB_PASSWORD, DB_PORT } from "../constants/database.js";


const sequelize = new Sequelize(DB, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT,
    port: DB_PORT
});


export default sequelize;