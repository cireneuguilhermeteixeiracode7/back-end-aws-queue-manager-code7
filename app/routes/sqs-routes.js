const express = require('express');
const router = express.Router();
const sqsController = require('../controllers/SQSController');


router.get(`/queue`,sqsController.getAllQueue);
router.post(`/queue/attributes`,sqsController.getQueueAttributes);
router.post(`/queue`,sqsController.createOrGetQueue);

module.exports = router;