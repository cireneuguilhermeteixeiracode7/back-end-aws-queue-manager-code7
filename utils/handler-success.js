module.exports = function(resp,data,message){
    resp.json(
        {   
            success : true,
            data : data,
            message : message || 'ok'
        }
    );
}
