const Attendance = require('../models/attendance')
const Beacon = require('../models/beacon')
const Lecture = require('../models/lecture')
const Student = require('../models/student')
const Teacher = require('../models/teacher')
const Notification = require("../models/notification")

exports.deleteAllAttendance = async (req, res) => {
    try {
        const passkey = req.headers['passkey'];
        if(!passkey){
            return res.status(400).json({ status: 'Bad Request'});
        }
        if (passkey === process.env.passkeyAdmin) {
            const deletedAttendances = await Attendance.deleteMany({});

            res.status(200).json({
                deletedAttendances
            });

        } else {
            res.status(500).json({ error: "Wrong passkey" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

exports.deleteAllStudents = async (req, res) => {
    try {
        const passkey = req.headers['passkey'];
        if(!passkey){
            return res.status(400).json({ status: 'Bad Request'});
        }
        if (passkey === process.env.passkeyAdmin) {
            const deletedStudents = await Student.deleteMany({});

            res.status(200).json({
                deletedStudents
            });

        } else {
            res.status(500).json({ error: "Wrong passkey" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

exports.deleteAllTeachers = async (req, res) => {
    try {
        const passkey = req.headers['passkey'];
        if(!passkey){
            return res.status(400).json({ status: 'Bad Request'});
        }
        if (passkey === process.env.passkeyAdmin) {
            const deletedTeachers = await Teacher.deleteMany({});

            res.status(200).json({
                deletedTeachers
            });

        } else {
            res.status(500).json({ error: "Wrong passkey" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

exports.deleteAllLecture = async (req, res) => {
    try {
        const passkey = req.headers['passkey'];
        if(!passkey){
            return res.status(400).json({ status: 'Bad Request'});
        }
        if (passkey === process.env.passkeyAdmin) {
            // Find all lectures
            const lectures = await Lecture.find({});
            // Iterate through each lecture and delete associated attendances
            for (const lecture of lectures) {
                const deletedAttendances = await Attendance.deleteMany({ lecture: lecture._id });
            }

            // Now delete all lectures
            const deletedLectures = await Lecture.deleteMany({});

            res.status(200).json({
                deletedLectures
            });

        } else {
            res.status(500).json({ error: "Wrong passkey" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

exports.deleteAllNotifications = async (req, res) => {
    try {
        const passkey = req.headers['passkey'];
        if(!passkey){
            return res.status(400).json({ status: 'Bad Request'});
        }
        if (passkey === process.env.passkeyAdmin) {
            const deletedNotifications = await Notification.deleteMany({});

            res.status(200).json({
                deletedNotifications
            });

        } else {
            res.status(500).json({ error: "Wrong passkey" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};