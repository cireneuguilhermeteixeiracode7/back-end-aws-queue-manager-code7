const express = require('express');
const router = express.Router();
const snsController = require('../controllers/SNSController');

router.get(`/topic`,snsController.getAllTopics);
router.get(`/topic/:topic_arn`,snsController.getTopicAttributes);
router.post(`/topic`,snsController.createOrGetTopic);
router.post(`/topic/pub`,snsController.publishTopic);
router.get(`/topic/sub/:topic_arn`,snsController.getSubscriptionsInTopic);
router.post(`/topic/sub`,snsController.subscribeTopic);
router.post(`/topic/sub/filter_policity`,snsController.setFilterPolicyAttribute);



module.exports = router;