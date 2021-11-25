const { Op } = require("sequelize");
const SurveyModel = require("../models/SurveyModel");
const FieldModel = require("../models/FieldModel")
const ResultModel = require("../models/ResultModel");

/**
 * Making relationship between Survey and Field model /
 * Haciendo relacion entre los modelos "encuesta" y "campo" 
 * */ 
SurveyModel.hasMany(FieldModel, {as: 'Fields'});

/**
 * Making relationship between "Survey" and "Field" model/
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
    const link = `http://localhost:8080/survey/${survey.dataValues.id}`;

    fields.forEach(field => {

      FieldModel.create({name:field.name, 
                         title: field.title, 
                         isRequired: field.isRequired, 
                         type: field.type, 
                         surveyId:survey.dataValues.id
                        });
    });

    return res.status(201).send({ok:true, link});
  });
}

// Update-survey module / Modulo de actualizacion de encuestas
exports.updateSurvey = async (req, res, next) => {

  // Survey name / nombre de la encuesta
  const name = req.body.name;
  // Survey description / descripcion de la encuesta
  const description = req.body.description;
  // Survey fields / campos de la encuesta
  const fields = req.body.fields;
  // Survey Id / Id de la encuesta
  const id = req.body.id;

  try {
    
    SurveyModel.update({name, description}, {where: {id}})
    .then(result => { 
      fields.forEach((field)=>{
        FieldModel.update({name: field.name,  
                           title: field.title,
                           isRequired: field.isRequired,
                           type: field.type}, {where: {id:field.id, [Op.and]: [{surveyId:id}]}}
                          );
      });
    });

  } catch (error) {

    const err = new Error(error.message);
    err.statusCode = 500;
    throw err;
  }

  return res.status(200).send(true);
}

// Delete-survey module / Modulo de eliminacion de encuestas
exports.deleteSurvey = async (req, res, next) => {

  // Survey Id / Id de la encuesta
  const id = req.params.id;

  try {

    const survey = await SurveyModel.findAll({ where: {id} });
    await survey[0].destroy();

  } catch (error) {
        const err = new Error(error.message);
        err.statusCode = 404;
        throw err;
    }
    return res.status(200).send(true);
}

// Fill-out-survey module / Modulo de llenado de encuestas
exports.fillSurvey = (req, res, next) => {

  // Survey Id / Id de la encuesta
  const surveyId = req.params.id;
  // Survey fields / campos de la encuesta
  const fields = req.body.fields;

    try {
     
      fields.forEach( async (field) => {

        /**
         * Verify that the field & survey returned by the client are related
         * Verificar que el campo y encuesta retornados por el ciente esten relacionados 
         * */ 
        const filter = await field.findAll({where: {id:field.id, [Op.and]: [{surveyId}]}});

        if(filter){
         await ResultModel.create({result:field.result, fieldId: field.id});
        } 
      });
     
    } catch (error) {

        const err = new Error(error.message);
        err.statusCode = 500;
        throw err;
    }

    return res.status(201).send(true);
}

// Get-survey-results module / Modulo de obtencion de resultados de encuestas
exports.getSurveyResults = async(req, res, next) => {

  // Survey Id / Id de la encuesta
  const id = req.params.id;
  // Suvey results / Resultado de las encuestas
  let results;

  try {

    results =  await FieldModel.findAll({where: {surveyId:id}, include:[ {model: ResultModel, as: "Results"} ] });
    
  } catch (error) {

    const err = new Error(error.message);
    err.statusCode = 500;
    throw err;
  }

  return res.status(200).json(results);
}

// Get survey and it's fields module / Modulo para obtener la encuesta y sus campos
exports.getSurvey = async(req, res, next) => {

  // Survey Id / Id de la encuesta
  const SurveyId = req.params.id;
  let survey;

  try {

    survey = SurveyModel.findAll({ where: {id:SurveyId}, include:[ {model: FieldModel, as: "Fields"} ] });
    
  } catch (error) {

    const err = new Error(error.message);
    err.statusCode = 500;
    throw err;
  }

  return res.status(200).json(survey);

}