const handleError = require('../../utils/handler-error');
const handleSuccess = require('../../utils/handler-success');
const SNSSQSManager = require('../../sns-sqs');


exports.getAllQueue = async (req,resp) => {
    
    try{
        const result = await new SNSSQSManager.default().getAllQueue();
        return handleSuccess(resp, result);
        
    }catch(error){
        console.log(error);
        return handleError(resp,error);
    }
}


exports.createOrGetQueue = async (req,resp) => {
    
    try{
        const params = req.body;
        const result = await new SNSSQSManager.default().createOrGetQueue(params.name);
        return handleSuccess(resp, result);
        
    }catch(error){
        console.log(error);
        return handleError(resp,error);
    }
}





exports.getQueueAttributes = async (req,resp) => {
    
    try{
        const queueUrl = req.body.url;
        const result = await new SNSSQSManager.default().getQueueAttributes(queueUrl);
        return handleSuccess(resp, result);
        
    } catch(error) {
        console.log(error);
        return handleError(resp,error);
    }
}







