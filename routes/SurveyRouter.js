const express = require('express');
const router = express.Router();
const SurveyController = require("../controllers/SurveyController");
const { Authenticate } = require("../middleware/Authenticate")

// Update survey
router.put('/', SurveyController.updateSurvey);

// GET Survey
router.get('/:id', SurveyController.getSurvey);

// Get survey results
router.get('/results/:id', SurveyController.getSurveyResults);

// Delete survey
router.delete('/:id', SurveyController.deleteSurvey);

// Create survey
router.post('/', SurveyController.addSurvey);

// Fill survey
router.post('/fill', SurveyController.fillSurvey);

module.exports = router;