const express = require('express');
const router = express.Router();
const SurveyController = require("../controllers/SurveyController");
const { Authenticate } = require("../middleware/Authenticate")

// Get authentication Token / Obtener Token de autenticación
router.get('/token', SurveyController.getToken);

// Update survey / Actualizar encuesta
router.put('/', Authenticate, SurveyController.updateSurvey);

// GET Survey & it's fields / Obtener encuesta & sus campos
router.get('/:id', SurveyController.getSurvey);

// Get survey results / Obtener resultados de encuesta
router.get('/results/:id', Authenticate, SurveyController.getSurveyResults);

// Delete survey / Eliminar encuesta
router.delete('/:id', Authenticate, SurveyController.deleteSurvey);

// Create survey / Crear encuesta
router.post('/', Authenticate, SurveyController.addSurvey);

// Fill out survey / Llenar encuesta
router.post('/fill', SurveyController.fillSurvey);

module.exports = router;