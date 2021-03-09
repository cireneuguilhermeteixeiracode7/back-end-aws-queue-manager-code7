const handleError = require('../../utils/handler-error');
const handleSuccess = require('../../utils/handler-success');
const SNSSQSManager = require('../../sns-sqs');

exports.getAllTopics = async (req,resp) => {
    
    try{
        const result = await new SNSSQSManager.default().getAllTopics();
        return handleSuccess(resp, result);
        
    }catch(error){
        console.log(error);
        return handleError(resp,error);
    }
}


exports.createOrGetTopic = async (req,resp) => {
    
    try{
        const params = req.body;
        const result = await new SNSSQSManager.default().createOrGetTopic(params.name);
        return handleSuccess(resp, result);
        
    }catch(error){
        console.log(error);
        return handleError(resp,error);
    }
}


exports.publishTopic = async (req,resp) => {
    
    try{
        const params = req.body;
        params.MessageGroupId = Date.now().toString();
        params.MessageDeduplicationId = Date.now().toString();
        params.Name = params.TopicArn.split(':')[5];
        const result = await new SNSSQSManager.default().publishToTopic(
            params.Name,
            params.Message,
            params.MessageGroupId,
            params.MessageDeduplicationId,
            params.TopicArn,
            params.MessageAttributes
        );
        return handleSuccess(resp, result);
        
    }catch(error){
        console.log(error);
        return handleError(resp,error);
    }
}



exports.subscribeTopic = async (req,resp) => {
    
    try{

        const params = req.body;
        const result = await new SNSSQSManager.default().subscribeToTopic(
            params.TopicArn,
            params.queueArn,
            params.QueueUrl
        );
        return handleSuccess(resp, result);
        
    }catch(error){
        console.log('errorrrr',error);
        return handleError(resp,error);
    }
}


exports.getSubscriptionsInTopic = async (req,resp) => {
    
    try{

        const topicArn = req.params.topic_arn;
        const listSubscriptions = await new SNSSQSManager.default()
            .getSubscriptionsInTopic(topicArn);
        listSubscriptions['TopicArn'] = topicArn;
        return handleSuccess(resp, listSubscriptions);
        
    } catch(error) {
        console.log(error);
        return handleError(resp,error);
    }
}


exports.setFilterPolicyAttribute = async (req,resp) => {
    
    try {

       
        const params = req.body;
        const setSubscriptionAttributes = await new SNSSQSManager.default()
        .setFilterPolicyAttributeInSubscription(
            params.SubscriptionArn,
            params.attributeValue
        )

        return handleSuccess(resp, setSubscriptionAttributes);
        
    } catch(error){
        console.log(error);
        return handleError(resp,error);
    }
}


exports.getTopicAttributes = async (req,resp) => {
    
    try{
        const TopicArn = req.params.topic_arn;
        const result = await new SNSSQSManager.default().getTopicAttributes(TopicArn);
        return handleSuccess(resp, result);
        
    }catch(error){
        console.log(error);
        return handleError(resp,error);
    }
}







