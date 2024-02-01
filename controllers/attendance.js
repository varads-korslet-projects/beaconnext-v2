const Attendance = require('../models/attendance');
const Lecture = require('../models/lecture');
const Student = require('../models/student');

exports.getAttendanceReport = async (req, res) => {
    try {
        const { department, year, division } = req.body;

        // Retrieve lectures for the specified department, year, and division
        const lectures = await Lecture.find({ department, year, division });

        // Initialize an object to store attendance report
        const attendanceReport = {};

        // Iterate through each lecture
        for (const lecture of lectures) {
            // Retrieve attendance record for the current lecture
            const attendanceRecord = await Attendance.findOne({ lecture: lecture._id });

            if (attendanceRecord) {
                // Iterate through each student in the attendance record
                for (const studentAttendance of attendanceRecord.students) {
                    // Retrieve student details
                    const studentDetails = await Student.findById(studentAttendance.Id);

                    // Calculate the percentage of attendance
                    const attendancePercentage = studentAttendance.Count;

                    // Initialize the student in the report if not already present
                    if (!attendanceReport[studentDetails.name]) {
                        attendanceReport[studentDetails.name] = {};
                    }

                    // Add the attendance percentage for the current subject
                    attendanceReport[studentDetails.name][lecture.subjectName] = attendancePercentage;
                }
            }
        }

        res.status(200).json({ attendanceReport });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
