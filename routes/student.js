const express = require('express')

const router = express.Router()

//middlewares
const {authCheck} = require("../middlewares/auth");

//controller
const {createOrUpdateStudent, currentStudent} = require('../controllers/student');

router.post("/create-or-update-student", authCheck, createOrUpdateStudent );
router.post("/current-student", authCheck, currentStudent );

module.exports = router; 