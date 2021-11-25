const Sequelize = require("sequelize");
require('dotenv').config();

module.exports = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASS, {
    host: process.env.HOST,
    dialect: 'mssql',    
    dialectOptions: {
        options: {
          enableArithAbort: true,
          useUTC: false,
          dateFirst: 1,
        }
    }
});