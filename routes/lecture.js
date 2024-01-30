const express = require('express')

const router = express.Router()

//middlewares
const {authCheckTeacher} = require("../middlewares/auth");

const {createLecture, lectureStatus, upcomingLectures, ongoingLectures} = require('../controllers/lecture');


router.post("/create-lecture",authCheckTeacher ,createLecture);
router.get("/lecture-status", lectureStatus);
router.get("/upcoming-teacher",authCheckTeacher, upcomingLectures);
router.get("/ongoing-teacher",authCheckTeacher, ongoingLectures);
module.exports = router;