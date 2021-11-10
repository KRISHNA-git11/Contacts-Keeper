const mongoose = require('mongoose');
const mongooseFieldEncryption = require('mongoose-field-encryption').fieldEncryption;
const secretString = require('../config').secretString;

const ContactSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
    },
    phone:{
        type: String,
    },
    type:{
        type:String,
        default:'Personal'
    },
    date:{
        type: Date,
        default: Date.now
    }
})

ContactSchema.plugin(mongooseFieldEncryption, { fields: ["name", "email", "phone", "type"], secret: toString(secretString) });
module.exports = mongoose.model('contact',ContactSchema)