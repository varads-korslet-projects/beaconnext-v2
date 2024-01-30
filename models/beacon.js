const mongoose = require('mongoose')

const beaconSchema = new mongoose.Schema({   
    Id: {
        type: String,
        required: true
    },
    RoomNo: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('Beacon', beaconSchema);