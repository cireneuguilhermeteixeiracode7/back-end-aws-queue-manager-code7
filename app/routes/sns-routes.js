const express = require('express');
const router = express.Router();
const snsController = require('../controllers/SNSController');

router.get(`/topic`,snsController.getAllTopics);
router.get(`/topic/:topic_arn`,snsController.getTopicAttributes);
router.post(`/topic`,snsController.createOrGetTopic);
router.post(`/topic/pub`,snsController.publishTopic);
router.post(`/topic/sub`,snsController.subscribeTopic);



module.exports = router;