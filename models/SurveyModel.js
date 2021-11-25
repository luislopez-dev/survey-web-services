const Sequelize = require("sequelize");
const db = require("../config/database");

/**
 * Survey model
 * Modelo de las encuestas
 */
const SurveyModel = db.define("surveys", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull:false,
        autoIncrement:true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull:false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull:false,
    },
    createdAt: {
        type: Sequelize.DATE,
        field: 'created_at',
        allowNull:false,
    },
    updatedAt: {
        type: Sequelize.DATE,
        field: 'updated_at',
        allowNull:false,
    }
}, { tableName: 'surveys' });

module.exports = SurveyModel;