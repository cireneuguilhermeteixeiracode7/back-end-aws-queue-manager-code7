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
        const result = await new SNSSQSManager.default().publishToTopic(
            params.Name,
            params.Message,
            params.MessageGroupId,
            params.MessageDeduplicationId,
            params.TopicArn
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
            params.queuArn
        );
        return handleSuccess(resp, result);
        
    }catch(error){
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







