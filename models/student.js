const mongoose = require('mongoose'),
bcrypt = require('bcrypt')

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        default: "M"
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
    department: {
        type: String,
        required: true,
        default: "computer"
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
        required: false,
        unique: false,
        default: "NULL"
    },
    hash_password: {
        type: String
    },
    role: {
        type:String,
        default:"student"
    }
},
{timestamps:true}
);

module.exports = mongoose.model('Student', studentSchema)