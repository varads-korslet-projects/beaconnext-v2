const express = require('express')

const router = express.Router()

const {authCheckStudent, authCheckTeacher} = require("../middlewares/auth");
const {getAttendanceReport, countAttendance, getAttendanceLecture, markPresent} = require('../controllers/attendance.js');


router.get("/get-attendance",authCheckTeacher, getAttendanceReport);
router.post("/get-attendance-lecture",authCheckTeacher, getAttendanceLecture);
router.post("/count-attendance", authCheckStudent, countAttendance)
router.post("/mark-present", authCheckTeacher, markPresent)
module.exports = router;