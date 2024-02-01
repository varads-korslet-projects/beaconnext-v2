const express = require('express')

const router = express.Router()

//middlewares
const {deleteAllLecture, deleteAllAttendance, deleteAllStudents, deleteAllTeachers, } = require('../controllers/delete');

router.delete("/delete-attendances", deleteAllAttendance);
router.delete("/delete-lectures", deleteAllLecture);
router.delete("/delete-students", deleteAllStudents)
router.delete("/delete-teachers", deleteAllTeachers)
module.exports = router;