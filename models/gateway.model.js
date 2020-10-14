const { Schema, model } = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const GatewaySchema = Schema({

    serial: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    ipv4: {
        type: String,
        required: true,
        unique:true
    }   
});


GatewaySchema.plugin(uniqueValidator, {message: 'This {PATH} is already registered in the Database' })


GatewaySchema.method('toJSON', function() {
    const { __v, _id,...object } = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model( 'Gateway', GatewaySchema );
