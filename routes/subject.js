const express = require('express')

const router = express.Router()

//controller
const {addSubject} = require('../controllers/subject');

router.post("/add-subjects",addSubject);

module.exports = router; 