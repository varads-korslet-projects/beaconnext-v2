const express = require('express')

const router = express.Router()

//middlewares
const {authCheckTeacher, authCheckStudent} = require("../middlewares/auth");

const {createLecture, lectureStatus, ongoingLecturesTeacher, upcomingLecturesTeacher, ongoingLecturesStudent, upcomingLecturesStudent} = require('../controllers/lecture');


router.post("/create-lecture",authCheckTeacher ,createLecture);
router.get("/lecture-status", lectureStatus);
router.get("/upcoming-teacher",authCheckTeacher, upcomingLecturesTeacher);
router.get("/ongoing-teacher",authCheckTeacher, ongoingLecturesTeacher);
router.get("/upcoming-student",authCheckStudent, upcomingLecturesStudent);
router.get("/ongoing-student",authCheckStudent, ongoingLecturesStudent);
module.exports = router;