module.exports = function(resp,error){
    resp.json(
        {   
            'success' : false,
            'data' : error
        }
    );
}

 