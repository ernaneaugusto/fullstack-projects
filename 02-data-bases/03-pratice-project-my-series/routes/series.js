const express = require('express');
const seriesController = require('../controllers/series')

const router = express.Router();

// dependence injection for series
const Series = require('../models/series');
const models = {
  Series
}

// router.get('/', seriesController.index);
// router.get('/nova', seriesController.nova);
// bind() add dependence injection
router.get('/', seriesController.index.bind(null, models));
router.get('/nova', seriesController.novaForm);
router.post('/nova', seriesController.novaProcess.bind(null, models));

router.get('/excluir/:id', seriesController.excluir.bind(null, models));

router.get('/editar/:id', seriesController.editarForm.bind(null, models));
router.post('/editar/:id', seriesController.editarProcess.bind(null, models));

router.get('/info/:id', seriesController.info.bind(null, models));
router.post('/info/:id', seriesController.addComentario.bind(null, models));

module.exports = router;