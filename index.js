require('dotenv').config()

const db = require('./config/database');
const express = require("express");
const app = express();
const SurveyRouter = require('./routes/SurveyRouter')
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT;

app.use(cors())
app.use(bodyParser.json());
app.use("/survey", SurveyRouter);
app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message, data});
});

/**
 * Sync up models with database
 * Sincronizar los modelos con la base de datos
 */
db.sync();

db.authenticate()
.then( () => { 
      console.log("Database connected"); 
      app.listen(PORT || 8080);
      console.log("Server successfuly running...");
    })
.catch(err => {throw new Error(err.message); });