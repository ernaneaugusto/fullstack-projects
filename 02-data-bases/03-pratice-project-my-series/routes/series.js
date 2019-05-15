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

module.exports = router;