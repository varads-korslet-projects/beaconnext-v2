const mongoose = require('mongoose'),
bcrypt = require('bcrypt')

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        default: "M"
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
        default: "CS"
    },
    role: {
        type:String,
        default:"teacher"
    }
},
{timestamps:true}
);


module.exports = mongoose.model('Teacher', teacherSchema)