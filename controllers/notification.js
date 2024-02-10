const Notification = require("../models/notification")
const Teacher = require("../models/teacher")
const Lecture = require("../models/lecture")

exports.createNotification = async(req, res) => {
    const notif = req.body;
    const currentTeacher = req.teacher;
    if (!notif || !currentTeacher) {
        return res.status(400).json({status:"Bad Request"});
    }
    if (!notif.title || !notif.description || !notif.EndTime) {
        return res.status(400).json({status:"Bad Request"});
    }
    if (!notif.department && res.body.roomNo){
        //Find which lecture is going on in given room and populate fields
        const lecture = await Lecture.findOne({
            teacher: currentTeacher._id,
            roomNo:res.body.roomNo,
            StartTime: { $lt: currentDate },
            EndTime: { $gt: currentDate }
        });
        notif.department = lecture.department;
        notif.year = lecture.year;
        notif.division = lecture.division;
    }
    notif.teacher = currentTeacher._id;
    const result = await Notification.create(notif);
    return res.status(200).json(result)
}

exports.updateNotification = async(req, res) => {


}

exports.getNotificationStudent = async(req, res) => {


}

exports.getNotificationTeacher = async(req, res) => {


}
