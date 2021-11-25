require('dotenv').config()
const db = require('./config/database');
const express = require("express");
const app = express();
const SurveyRouter = require('./routes/SurveyRouter')
const cors = require('cors');
const bodyParser = require('body-parser');

var os = require('os');

var networkInterfaces = os.networkInterfaces();

console.log(networkInterfaces.usb0[0].address);

// SurveyModel.hasMany(FieldModel, {as: 'Workers'});

// You can change the user.js file
db.sync();

app.use(cors())
app.use(bodyParser.json());
app.use("/survey", SurveyRouter);

app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message, data});
});

db.authenticate()
.then( () => { 
      console.log("Database connected"); 
      app.listen(8080);
    })
.catch(err => {throw new Error(err.message); });