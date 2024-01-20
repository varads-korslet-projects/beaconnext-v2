const express = require('express')

const router = express.Router()

//middlewares
//const {authCheck} = require("../middlewares/auth");

const {createTeacherAccounts, firstLogin, teacherLogin} = require('../controllers/teacher');

//router.post("/current-teacher", authCheck, currentTeacher );
router.post("/create-teacher-accounts",createTeacherAccounts);
router.post("/first-teacher-login", firstLogin);
router.post("/teacher-login", teacherLogin)
module.exports = router;