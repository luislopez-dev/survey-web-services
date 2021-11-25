require('dotenv').config();

const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

/**
 * JWT authnetication module /
 * Modulo de autenticacion por medio de JSON Web Token
 */

let Authenticate = (req, res, next) => {

  const authHeader = req.get('Authorization');

  if(!authHeader) {

    const error = new Error('Not authenticated');
    error.statusCode = 401;
    throw error;
  }

  const token = authHeader.split(' ')[1];
  let docodedToken;

  try {

    docodedToken = jwt.verify(token, SECRET_KEY);

  } catch (err) {

    const error = new Error('Not authenticated');
    error.statusCode = 401;
    throw error;    
  }

  if(!docodedToken){
    const error = new Error('Not authenticated');
    error.statusCode = 401;
    throw error;
  }

  req.userId = docodedToken.userId;

  next();
}

module.exports = { Authenticate };