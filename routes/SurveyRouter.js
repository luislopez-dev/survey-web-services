const express = require('express');
const router = express.Router();
const SurveyController = require("../controllers/SurveyController");
const { Authenticate } = require("../middleware/Authenticate")

// Update survey / Actualizar encuesta
router.put('/', SurveyController.updateSurvey);

// GET Survey & it's fields / obtener encuesta & sus campos
router.get('/:id', SurveyController.getSurvey);

// Get survey results / Obtener resultados de encuesta
router.get('/results/:id', SurveyController.getSurveyResults);

// Delete survey / Eliminar encuesta
router.delete('/:id', SurveyController.deleteSurvey);

// Create survey / Crear encuesta
router.post('/', SurveyController.addSurvey);

// Fill out survey / Llenar encuesta
router.post('/fill', SurveyController.fillSurvey);

module.exports = router;