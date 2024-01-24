const express = require('express')

const router = express.Router()

//middlewares
const {authCheckStudent} = require("../middlewares/auth");

//controller
const {currentStudent,createStudentAccounts, getAll, firstLogin, studentLogin, test} = require('../controllers/student');

router.post("/current-student", authCheckStudent, currentStudent );
router.post("/create-student-accounts",createStudentAccounts);
router.post("/first-student-login", firstLogin);
router.post("/student-login", studentLogin)
router.get("/getAll",  getAll);
router.get("/test", test)
module.exports = router; 