const Attendance = require('../models/attendance')
const Beacon = require('../models/beacon')
const Lecture = require('../models/lecture')
const Student = require('../models/student')
const Teacher = require('../models/teacher')

exports.deleteAllAttendance = async (req, res) => {
    try {
        const passkey = req.headers['passkey'];
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

exports.deleteAllLecture = async (req, res) => {
    try {
        const passkey = req.headers['passkey'];
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

