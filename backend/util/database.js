import "dotenv/config";

import Sequelize from "sequelize";

const sequelize = new Sequelize('smart_resume', 'sm', process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

export default sequelize;