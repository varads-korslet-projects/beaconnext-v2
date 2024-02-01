const express = require('express')

const router = express.Router()

//middlewares
const {deleteAllLecture, deleteAllAttendance, deleteAllStudents, } = require('../controllers/delete');

router.delete("/delete-attendances", deleteAllAttendance);
router.delete("/delete-lectures", deleteAllLecture);
router.delete("/delete-students", deleteAllStudents)

module.exports = router;