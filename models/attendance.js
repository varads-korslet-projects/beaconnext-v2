const mongoose = require('mongoose'),
bcrypt = require('bcrypt')
const { ObjectId } = mongoose.Schema;

const attendanceSchema = new mongoose.Schema({
    lecture: {
        type: ObjectId,
        ref: "Lecture",
        unique: true,
        required: true
    },
    student:[{
        "Id" :{
            type: ObjectId,
            ref: "Student",
            required: true
        },
        "Count":{
            type: Number,
            default: 0
        },
        "Present":{
            type: Boolean,
            default: false
        }
    }]
},
{timestamps:true}
);


module.exports = mongoose.model('Attendance', attendanceSchema)