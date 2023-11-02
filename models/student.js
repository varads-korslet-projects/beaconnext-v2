const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name: String,
    email: {
        type : String,
        unique:true,
        required: true,
        index: true,
    },
    moodleId:{
        type : Number,
        required: true,
        index : true,
    }
},
{timestamps:true}
);

module.exports = mongoose.model('Student', studentSchema)