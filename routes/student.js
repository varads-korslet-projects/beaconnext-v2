const express = require('express')

const router = express.Router()

//middlewares
const {authCheckStudent} = require("../middlewares/auth");

//controller
const {currentStudent,createStudentAccounts, getAll, firstLogin, studentLogin, test, countAttendance} = require('../controllers/student');

router.get("/current-student", authCheckStudent, currentStudent );
router.get("/getAll",  getAll);
router.get("/test", test);
router.post("/create-student-accounts",createStudentAccounts);
router.post("/first-student-login", firstLogin);
router.post("/student-login", studentLogin)
router.post("/count-attendance", authCheckStudent, countAttendance)
module.exports = router; 