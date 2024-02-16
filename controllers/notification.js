const Notification = require("../models/notification")
const Teacher = require("../models/teacher")
const Student = require("../models/student")
const Lecture = require("../models/lecture")

exports.createNotification = async(req, res) => {
    const notif = req.body;
    const currentTeacher = req.teacher;
    const currentDate = new Date();
    if (!notif || !currentTeacher) {
        return res.status(400).json({status:"Bad Request"});
    }
    if (!notif.title || !notif.description) {
        return res.status(400).json({status:"Bad Request"});
    }
    if (notif.EndTime && notif.EndTime>currentDate) {
        return res.status(400).json({status:"Bad Request"});
    }
    if (!notif.department && notif.roomNo){
        //Find which lecture is going on in given room and populate fields
        const lecture = await Lecture.findOne({
            teacher: currentTeacher._id,
            roomNo:notif.roomNo,
            StartTime: { $lt: currentDate },
            EndTime: { $gt: currentDate }
        });
        if(!lecture){
            return res.status(400).json({status:"Bad Request"});
        }
        notif.department = lecture.department;
        notif.year = lecture.year;
        notif.division = lecture.division;
        if(!notif.EndTime){
            notif.EndTime = lecture.EndTime;
        }
    }
    notif.teacher = currentTeacher._id;
    const result = await Notification.create(notif);
    return res.status(200).json(result)
}

exports.updateNotification = async(req, res) => {


}

exports.getNotificationStudent = async(req, res) => {
    const currentStudent = await Student.findOne({ moodleId: req.student.moodleId }).exec();
    try {
        const notifications = await Notification.find({
            department: currentStudent.department,
            year: currentStudent.year,
            division: currentStudent.division
        });
        return res.status(200).json(notifications);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ status: "Internal Server Error", message: "Error fetching notifications" });
    }
}

exports.getNotificationTeacher = async(req, res) => {
    const currentTeacher = req.teacher;
    try {
        const notifications = await Notification.find({
            teacher: currentTeacher._id // Use currentTeacher._id instead of currentTeacher.Id
        });
        return res.status(200).json(notifications);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ status: "Internal Server Error", message: "Error fetching notifications" });
    }
}
