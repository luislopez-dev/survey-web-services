const SurveyModel = require("../models/SurveyModel");
const FieldModel = require("../models/FieldModel")
const AnswerModel = require("../models/AnswerModel");
const { Op } = require("sequelize");

SurveyModel.hasMany(FieldModel, {as: 'Fields'});

FieldModel.hasMany(AnswerModel, {as: 'Answers'});

exports.addSurvey = async (req, res, next) => {

    const name = req.body.name;
    const description = req.body.description;
    const fields = req.body.fields;

    SurveyModel.create({name, description}).then( survey => {

      fields.forEach(field => {

        FieldModel.create({name:field.name, 
                            title: field.title, 
                            isRequired: field.isRequired, 
                            type: field.type, 
                            surveyId:survey.dataValues.id}
                          );
      });
      return res.status(201).send({ok:true, link:`http://localhost:8080/survey/${survey.dataValues.id}`});
    } );
}

exports.updateSurvey = async (req, res, next) => {

  const name = req.body.name;
  const description = req.body.description;
  const fields = req.body.fields;
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

exports.deleteSurvey = async (req, res, next) => {

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

exports.fillSurvey = async (req, res, next) => {

  const fields = req.body.fields;

    try {
     
      fields.forEach(field => {
        AnswerModel.create({answer:field.answer, fieldId: field.id});
      });
     
    } catch (error) {

        const err = new Error(error.message);
        err.statusCode = 500;
        throw err;
    }

    return res.status(201).send(true);
}

exports.getSurveyAnswers = async(req, res, next) => {

  const id = req.params.id;
  let answers;

  try {

     answers =  await FieldModel.findAll({where: {surveyId:id}, include:[ {model: AnswerModel, as: "Answers"} ] });
    
  } catch (error) {

    const err = new Error(error.message);
    err.statusCode = 500;
    throw err;

  }

  return res.status(200).json(answers);

}

exports.getSurvey = async(req, res, next) => {

  const id = req.params.id;
  let survey;

  try {

    survey =  await FieldModel.findAll({ where: {surveyId:id} });
    
  } catch (error) {

    const err = new Error(error.message);
    err.statusCode = 500;
    throw err;
  }

  return res.status(200).json(survey);

}