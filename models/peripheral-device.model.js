const { Schema, model } = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const Device = Schema({

    uid: {
        type: Number,
        required: true
    },
    vendor : {
        type: String,
        required: true,
    },
    status : {
        type: Boolean,
        required: true,
        default:true
    },
    date:{
        type:Date,
        require:true
    },
    gateway: {
        type: Schema.Types.ObjectId,
        ref: 'Gateway',
        required: true
    },

});


Device.plugin(uniqueValidator, {message: 'This {PATH} is already registered in the Database' })


Device.method('toJSON', function() {
    const { __v, _id, date,...object } = this.toObject();  
    const auxDate = date.toString().split(' ')    
    object.id = _id;   
    object.date = auxDate[1]+" "+auxDate[2]+" "+auxDate[3];
    return object;
})

module.exports = model( 'Device', Device );
