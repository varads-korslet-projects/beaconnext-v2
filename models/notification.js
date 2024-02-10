const mongoose = require('mongoose'),
bcrypt = require('bcrypt')
const { ObjectId } = mongoose.Schema;

const notificationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    links: [{
        link: {
            type: String,
        }
    }],
    department: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    division: {
        type: String,
        required: true,
    },
    EndTime:{
        type: Date,
        required: true,
    },
    teacher:{
        type: ObjectId,
        ref: "Teacher",
    },
},
{timestamps:true}
);


module.exports = mongoose.model('Notification', notificationSchema)