const express = require('express')

const router = express.Router()

//middlewares
const {authCheckTeacher, authCheckStudent} = require("../middlewares/auth");

const {createNotification, updateNotification, getNotificationStudent, getNotificationTeacher} = require('../controllers/notification');


router.post("/create-notification",authCheckTeacher ,createNotification);
router.put("/update-notification", authCheckTeacher, updateNotification);
router.get("/get-notification-student",authCheckStudent, getNotificationStudent);
router.get("/get-notification-teacher",authCheckTeacher, getNotificationTeacher);
module.exports = router;