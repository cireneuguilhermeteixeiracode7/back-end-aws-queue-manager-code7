const mongoose = require('mongoose');
var config = require('config');

mongoose.connect(config.DBHost,
    { 
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
.then(connection => {
    console.log('success');
}).catch(error => {
    console.error('error to connect', error);
})

module.exports = mongoose
