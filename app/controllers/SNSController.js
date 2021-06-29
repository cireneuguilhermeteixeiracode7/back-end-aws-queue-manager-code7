const handleError = require('../../utils/handler-error');
const handleSuccess = require('../../utils/handler-success');
const SNSSQSManager = require('sns-sqs-slq-code7');
const OrchyBase = require("orchy-base-code7");
const AWS = require("aws-sdk");

const orchybase = new OrchyBase.default();



exports.getAllTopics = async (req,resp) => {
    
    try{
        console.log('xxxx');
        const contacts = await orchybase.getContacts(1);
        // console.log(contacts);
        // const user = AWS.OpsWorks();

        // const newLoad = await orchybase.createLoad({
        //     id_flow: '1312',
        //     id_org: 123,
        //     register: Date.now(),
        //     active: true,
        //     created_at: Date.now(),
        //     updated_at: null,
        // });
        
        // console.log(newLoad);


        // const newContact = await orchybase.createContact({
        //     id_load: newLoad.id_load,
        //     key: `xxxxxxxxxx${Date.now()}`,
        //     name: 'Cireneu G.',
        //     created_at: Date.now(),
        //     updated_at: null,
        // });
        
        // console.log(newContact);



        // const newContactData = await orchybase.createContactData({
        //     id_contact: 1,
        //     data_type: 'landline',
        //     contact_data: `bbbbbbb`,
        //     status: 'pending',
        //     created_at: Date.now(),
        //     updated_at: null,
        // });
        // console.log(newContactData);
        
        // const x = await orchybase.deleteContact({id_contact: 2});
        // console.log(x);
        
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







