const handleError = require('../../utils/handler-error');
const handleSuccess = require('../../utils/handler-success');
const SNSSQSManager = require('sns-sqs-slq-code7');
const OrchyBase = require("orchy-base-code7");
const AWS = require("aws-sdk");

const orchybase = new OrchyBase.default(true);




exports.getCarga = async (req,resp) => {
    
    try{

        const contacts = await orchybase.getContacts(null);
        const loads = await orchybase.getLoads(null);
        const queue_contacts = await orchybase.getQueueContacts();
        const queues = await orchybase.getQueues(null);

        const result = {
            contacts,
            loads,
            queue_contacts,
            queues
        }
        console.log(loads);
        return handleSuccess(resp, result);
        
    }catch(error){
        console.log(error);
        return handleError(resp,error);
    }
}







