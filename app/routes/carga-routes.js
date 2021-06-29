const express = require('express');
const router = express.Router();
const cargaController = require('../controllers/cargaController');

router.get(`/`,cargaController.getCarga);



module.exports = router;