const mongoose = require('mongoose'),
bcrypt = require('bcrypt')

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
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
    hash_password: {
        type: String
    },
    department: {
        type: String,
        required: true
    },
    role: {
        type:String,
        default:"teacher"
    }
},
{timestamps:true}
);


module.exports = mongoose.model('Teacher', teacherSchema)