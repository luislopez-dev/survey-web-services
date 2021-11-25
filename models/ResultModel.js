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
        // user_id can not be null.
        allowNull:false,
        // Increment the value automatically
        autoIncrement:true,
    },
    result: {
        type: Sequelize.STRING,
        allowNull:false,
    }
})

module.exports = ResultModel;
