const express = require('express')

const router = express.Router()

const {getAttendanceReport} = require('../controllers/attendance.js');


router.get("/get-attendance", getAttendanceReport);
module.exports = router;