require('dotenv').config()

const { Op } = require("sequelize");
const SurveyModel = require("../models/SurveyModel");
const FieldModel = require("../models/FieldModel")
const ResultModel = require("../models/ResultModel");
const jwt = require('jsonwebtoken');
const PORT = process.env.PORT;
const SECRET_KEY = process.env.SECRET_KEY;

/**
 * Making relationship between Survey and Field model /
 * Haciendo relacion entre los modelos "encuesta" y "campo" 
 * */ 
SurveyModel.hasMany(FieldModel, {as: 'Fields'});

/**
 * Making relationship between "Survey" and "Field" model /
 * Haciendo relacion entre los modelos "campo" y "resultado" 
 */
FieldModel.hasMany(ResultModel, {as: 'Results'});

// Create-survey module / Modulo de creacion de encuestas
exports.addSurvey = async (req, res, next) => {

  // Survey name / nombre de la encuesta
  const name = req.body.name;
  // Survey description / descripcion de la encuesta
  const description = req.body.description;
  // Survey fields / campos de la encuesta
  const fields = req.body.fields;

  SurveyModel.create({name, description}).then( survey => {

    /**
      * This link will work for filling out the survey /
      * Este link se retornara y servira para llenar la encuesta
    */
    const link  = `http://localhost:${PORT || 8080}/survey/${survey.dataValues.id}`;
  
    fields.forEach( async ( field) => {
  
      FieldModel.create({name:field.name, 
                         title: field.title, 
                         isRequired: field.isRequired, 
                         type: field.type, 
                         surveyId:survey.dataValues.id
                        });
    });

    return res.status(201).send({ok:true, link});
  })
  .catch( err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
}

// Update-survey module / Modulo de actualizacion de encuestas
exports.updateSurvey = async (req, res, next) => {

  // Survey Id / Id de la encuesta
  const id = req.body.id;
  // Survey name / nombre de la encuesta
  const name = req.body.name;
  // Survey description / descripcion de la encuesta
  const description = req.body.description;
  // Survey fields / campos de la encuesta
  const fields = req.body.fields;
    
  SurveyModel.update({name, description}, {where: {id}})
  .then(() => { 
    fields.forEach((field) => {
      FieldModel.update({name: field.name,  
                         title: field.title,
                         isRequired: field.isRequired,
                         type: field.type}, {where: {id:field.id, [Op.and]: [{surveyId:id}]}}
                        );
    });

    return res.status(200).send(true);
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
}

// Delete-survey module / Modulo de eliminacion de encuestas
exports.deleteSurvey = async (req, res, next) => {

  // Survey Id / Id de la encuesta
  const surveyId = req.params.id;

  try {
    // suvey fields / campos de la encuesta
    const surveyFields = await FieldModel.findAll({where:{surveyId}});

    // Delete survey results / Eliminar los resultados de la encuesta
    surveyFields.forEach( async (field) => {
     await ResultModel.destroy({where:{fieldId:field.dataValues.id}});
    });

    // Delete survey fields / eliminar los campos de la encuesta
    await FieldModel.destroy({where:{surveyId}});

    // Finally delete the survey / Finalmente eliminar la encuesta
    await SurveyModel.destroy({where:{id:surveyId}});
    
  } catch (err) {
    if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
  }

  return res.status(200).send(true); 
}

// Fill-out-survey module / Modulo de llenado de encuestas
exports.fillSurvey = (req, res, next) => {

  // Survey Id / Id de la encuesta
  const surveyId = req.body.id;
  // Survey fields / campos de la encuesta
  const fields = req.body.fields;

  try {
     
    fields.forEach( async (field) => {

      /**
      * Verify that the field & survey returned by the client are related
      * Verificar que el campo y encuesta retornados por el ciente esten relacionados 
      * */ 
      const filter = await FieldModel.findAll({where: {id:field.id, [Op.and]: [{surveyId}]}});

      if(filter){
        await ResultModel.create({result:field.result, fieldId: field.id});
      }   
    });
     
  } catch (err) {

    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

  return res.status(201).send(true);
}

// Get-survey-results module / Modulo de obtencion de resultados de encuestas
exports.getSurveyResults = async (req, res, next) => {

  // Survey Id / Id de la encuesta
  const id = req.params.id;
  // Suvey results / Resultado de las encuestas
  let results;

  try {

    results =  await FieldModel.findAll({where: {surveyId:id}, include:[ {model: ResultModel, as: "Results"} ] });
    
  } catch (err) {

    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

  return res.status(200).json(results);
}

// Get survey and it's fields module / Modulo para obtener la encuesta y sus campos
exports.getSurvey = async (req, res, next) => {

  // Survey Id / Id de la encuesta
  const SurveyId = req.params.id;
  let survey;

  try {

    survey = await SurveyModel.findAll({ where: {id:SurveyId}, include:[ {model: FieldModel, as: "Fields"} ] });
    
  } catch (err) {

    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

  return res.status(200).json(survey);
}

// Get authentication token - module / Modulo para obtener token de autenticación
exports.getToken = async (req, res, next) => {

  let token;

  try {
    
    token = jwt.sign({}, SECRET_KEY, {algorithm: "HS256", expiresIn: '24h'});

  } catch (err) {
    
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
  res.status(200).send({ok:true, token});
}