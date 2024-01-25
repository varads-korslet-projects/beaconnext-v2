const express = require('express')

const router = express.Router()

//middlewares
const {authCheckTeacher} = require("../middlewares/auth");

const {createTeacherAccounts, currentTeacher, firstLogin, teacherLogin} = require('../controllers/teacher');

router.get("/current-teacher", authCheckTeacher, currentTeacher );
router.post("/create-teacher-accounts",createTeacherAccounts);
router.post("/first-teacher-login", firstLogin);
router.post("/teacher-login", teacherLogin)
module.exports = router;