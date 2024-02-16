const express = require('express')

const router = express.Router()

//middlewares
const {deleteAllLecture, deleteAllAttendance, deleteAllStudents, deleteAllTeachers, deleteAllNotifications, } = require('../controllers/delete');

router.delete("/delete-attendances", deleteAllAttendance);
router.delete("/delete-lectures", deleteAllLecture);
router.delete("/delete-students", deleteAllStudents)
router.delete("/delete-teachers", deleteAllTeachers)
router.delete("/delete-notifications", deleteAllNotifications)
module.exports = router;