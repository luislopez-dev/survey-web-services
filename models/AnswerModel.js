const Sequelize = require("sequelize");
const db = require("../config/database");

const AnswerModel = db.define("answers", {

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        // user_id can not be null.
        allowNull:false,
        // Increment the value automatically
        autoIncrement:true,
    },
    answer: {
        type: Sequelize.STRING,
        allowNull:false,
    }
})

module.exports = AnswerModel;
