import "dotenv/config";

import Sequelize from "sequelize";

const sequelize = new Sequelize('smart_resume', 'sm', process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
});

export default sequelize;