const Sequelize = require("sequelize");
const db = require("../config/database");

const FieldModel = db.define("fields", {

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