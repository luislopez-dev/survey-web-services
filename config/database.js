const Sequelize = require("sequelize");
require('dotenv').config();

// Database connection / Conexion a la base de datos
module.exports = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASS, {
    host: process.env.HOST,
    dialect: 'mssql',    
    dialectOptions: {
        options: {
          enableArithAbort: true,
          useUTC: false,
          dateFirst: 1,
        }
    },
    logging: false
});