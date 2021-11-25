const express = require('express');
const router = express.Router();
const SurveyController = require("../controllers/SurveyController");
const { Authenticate } = require("../middleware/Authenticate")

// GET Survey
router.get('/:id', SurveyController.getSurvey);

// Get survey answers
router.get('/answers/:id', SurveyController.getSurveyAnswers);

// Delete survey
router.delete('/:id', SurveyController.deleteSurvey);

// Update survey
router.put('/', SurveyController.updateSurvey);

// Create survey
router.post('/', SurveyController.addSurvey);

// Fill survey
router.post('/fill', SurveyController.fillSurvey);

module.exports = router;