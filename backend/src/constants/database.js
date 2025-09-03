import "dotenv/config"

const DB_USER = process.env.DB_USER
const DB = process.env.DB
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_PORT = process.env.DB_PORT
const DB_DIALECT = process.env.DB_DIALECT
const DB_HOST = process.env.DB_HOST

export { DB_USER, DB, DB_PASSWORD, DB_PORT, DB_DIALECT, DB_HOST }