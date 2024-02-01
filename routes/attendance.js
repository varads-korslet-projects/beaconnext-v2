const express = require('express')

const router = express.Router()

const {authCheckStudent} = require("../middlewares/auth");
const {getAttendanceReport, countAttendance} = require('../controllers/attendance.js');


router.get("/get-attendance", getAttendanceReport);
router.post("/count-attendance", authCheckStudent, countAttendance)
module.exports = router;