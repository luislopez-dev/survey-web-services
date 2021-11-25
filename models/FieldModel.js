const Sequelize = require("sequelize");
const db = require("../config/database");

/**
 * Model for survey fields /
 * Modelo para los campos de las encuestas
 */
const FieldModel = db.define("fields", {

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
    title: {
        type: Sequelize.STRING,
        allowNull:false,
    },
    isRequired: {
        type: Sequelize.BOOLEAN,
        allowNull:false,
    },
    type: {
        type: Sequelize.STRING || Sequelize.INTEGER || Sequelize.DATE
    }
})

module.exports = FieldModel;