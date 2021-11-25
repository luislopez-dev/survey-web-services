const Sequelize = require("sequelize");
const db = require("../config/database");

const SurveyModel = db.define("surveys", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        // user_id can not be null.
        allowNull:false,
        // Increment the value automatically
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
        // defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull:false,
    },
    updatedAt: {
        type: Sequelize.DATE,
        field: 'updated_at',
        // defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        allowNull:false,
    }
}, { tableName: 'surveys' });

module.exports = SurveyModel;