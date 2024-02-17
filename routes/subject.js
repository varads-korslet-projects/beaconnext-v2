const express = require('express')

const router = express.Router()

//controller
const {addSubject, getSubject} = require('../controllers/subject');

router.post("/add-subjects",addSubject);
router.post("/get-subjects", getSubject)
module.exports = router; 