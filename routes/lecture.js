const express = require('express')

const router = express.Router()

//middlewares
const {authCheckTeacher, authCheckStudent} = require("../middlewares/auth");

const {createLecture, lectureStatus, ongoingLecturesTeacher, upcomingLecturesTeacher, ongoingLecturesStudent, upcomingLecturesStudent, historyLecturesStudent, historyLecturesTeacher} = require('../controllers/lecture');


router.post("/create-lecture",authCheckTeacher ,createLecture);
router.post("/lecture-status", lectureStatus);
router.get("/upcoming-teacher",authCheckTeacher, upcomingLecturesTeacher);
router.get("/ongoing-teacher",authCheckTeacher, ongoingLecturesTeacher);
router.get("/upcoming-student",authCheckStudent, upcomingLecturesStudent);
router.get("/ongoing-student",authCheckStudent, ongoingLecturesStudent);
router.get("/history-student",authCheckStudent, historyLecturesStudent);
router.get("/history-teacher",authCheckTeacher, historyLecturesTeacher);
module.exports = router;