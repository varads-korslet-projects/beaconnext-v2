const express = require('express')

const router = express.Router()

//middlewares
const {mapBeacon, getRoom} = require('../controllers/beacon');


router.post("/map-beacon", mapBeacon);
router.post("/get-room", getRoom)
module.exports = router;