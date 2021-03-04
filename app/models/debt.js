const mongoose = require('../../connection/Connection');
const Schema = mongoose.Schema;

const debtSchema = new Schema({

    clientId : { type : Number, required : true, min: 1, max: 10 },
    reason : { type : String, required : true,  },
    date   : { type : Date,   required : true,  },
    value  : { type : Number, required : true,  },

});

module.exports = mongoose.model('Debt',debtSchema);