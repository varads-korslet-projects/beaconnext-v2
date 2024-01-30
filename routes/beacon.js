const express = require('express')

const router = express.Router()

//middlewares
const {mapBeacon} = require('../controllers/beacon');


router.post("/map-beacon", mapBeacon);

module.exports = router;