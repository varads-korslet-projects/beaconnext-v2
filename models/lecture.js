const mongoose = require('mongoose'),
bcrypt = require('bcrypt')
const { ObjectId } = mongoose.Schema;

const lectureSchema = new mongoose.Schema({
    subjectName: {
       type: String,
       required: true
    },
    teacher:{
        type: ObjectId,
        ref: "Teacher",
    },
    StartTime:{
        type: Date,
        required: true,
    },
    EndTime:{
        type: Date,
        required: true,
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
    roomNo:{ //roomno
        type: Number,
        required: true
    },
    minimumTime:{
        type: Number,
        required: true
    }
},
{timestamps:true}
);


module.exports = mongoose.model('Lecture', lectureSchema)