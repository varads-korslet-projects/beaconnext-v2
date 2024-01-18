const express = require('express')

const router = express.Router()

//middlewares
const {authCheck} = require("../middlewares/auth");

//controller
const {currentStudent,createStudentAccounts, getAll, firstLogin, studentLogin} = require('../controllers/student');

router.post("/current-student", authCheck, currentStudent );
router.post("/create-student-accounts",createStudentAccounts);
router.post("/first-login", firstLogin);
router.post("/student-login", studentLogin)
router.get("/getAll",  getAll);
module.exports = router; 