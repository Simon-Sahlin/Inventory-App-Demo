const { Pool } = require("pg");

module.exports = new Pool({
    host: process.env.dbHost,
    user: process.env.dbUser,
    database: "inventory_app_db",
    password: process.env.dbPassword,
    port: process.env.dbPort
});