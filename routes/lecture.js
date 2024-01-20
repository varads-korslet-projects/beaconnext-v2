const express = require('express')

const router = express.Router()

//middlewares
const {authCheckTeacher} = require("../middlewares/auth");

const {createLecture} = require('../controllers/lecture');

//router.post("/current-teacher", authCheck, currentTeacher );
router.post("/create-lecture",authCheckTeacher ,createLecture);
// router.post("/first-teacher-login", firstLogin);
// router.post("/teacher-login", teacherLogin)
module.exports = router;