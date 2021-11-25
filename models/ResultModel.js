const Sequelize = require("sequelize");
const db = require("../config/database");

/**
 * Model for survey results
 * Modelo para los resultados de las encuestas
 */
const ResultModel = db.define("results", {

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull:false,
        autoIncrement:true,
    },
    result: {
        type: Sequelize.STRING,
        allowNull:true,
    }
})

module.exports = ResultModel;
