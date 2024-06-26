const mongoose = require('mongoose')

const beaconSchema = new mongoose.Schema({   
    Id: {
        type: String,
        required: true,
        unique : true
    },
    RoomNo: {
        type: Number,
        required: true,
        unique: true
    },
});

module.exports = mongoose.model('Beacon', beaconSchema);