const express = require('express')

const router = express.Router()

//middlewares
const {authCheckTeacher} = require("../middlewares/auth");

const {createLecture, lectureStatus, ongoingLecturesTeacher, upcomingLecturesTeacher} = require('../controllers/lecture');


router.post("/create-lecture",authCheckTeacher ,createLecture);
router.get("/lecture-status", lectureStatus);
router.get("/upcoming-teacher",authCheckTeacher, upcomingLecturesTeacher);
router.get("/ongoing-teacher",authCheckTeacher, ongoingLecturesTeacher);
module.exports = router;