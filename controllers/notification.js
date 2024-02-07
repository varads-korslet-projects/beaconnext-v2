const Notification = require("../models/notification")
const Teacher = require("../models/teacher")

exports.createNotification = async(req, res) => {
    const notif = req.body;
    const currentTeacher = req.teacher._id;
    if (!Notification || !Teacher) {
        return res.status(400).json({status:"Bad Request"});
    }
    notif.teacher = currentTeacher;
    const result = await Notification.create(notif);
    return res.status(200).json(result)
}

exports.updateNotification = async(req, res) => {


}

exports.getNotificationStudent = async(req, res) => {


}

exports.getNotificationTeacher = async(req, res) => {


}
