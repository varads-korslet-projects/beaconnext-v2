const express = require('express')

const router = express.Router()

//middlewares
const {authCheckTeacher} = require("../middlewares/auth");

const {createLecture, lectureStatus} = require('../controllers/lecture');


router.post("/create-lecture",authCheckTeacher ,createLecture);
router.get("/lecture-status", lectureStatus);
module.exports = router;