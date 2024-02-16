const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    subjectName: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    year:{
        type: Number,
        required: true,
    },
    division:{
        type: String,
        max: 2
    },
}, { timestamps: true });

module.exports = mongoose.model('Subject', subjectSchema);