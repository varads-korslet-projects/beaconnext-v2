const mongoose = require('mongoose'),
bcrypt = require('bcrypt')

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type : String,
        unique:true,
        lowercase: true,
        required: true,
        index: true,
    },
    moodleId:{
        type : Number,
        required: true,
        index : true,
    },
    year:{
        type: Number,
        required: true,
    },
    division:{
        type: String,
         max: 2
    },
    // phoneNumber:{
    //     type: Number,
    //     required: true,
    // },
    deviceId:{
        type : String,
        unique:true,
    },
    hash_password: {
        type: String
    },
},
{timestamps:true}
);

module.exports = mongoose.model('Student', studentSchema)