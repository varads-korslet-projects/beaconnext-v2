const Attendance = require('../models/attendance');
const Lecture = require('../models/lecture');
const Student = require('../models/student');
const Beacon = require('../models/beacon');

exports.getAttendanceReport = async (req, res) => {
    try {
        const { department, year, division } = req.body;
        if(!department || !year || !division){
            return res.status(400).json({ status: 'Bad Request'});
        }
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

exports.getAttendanceLecture = async(req,res) => {
    const { lectureId } = req.body;
    if(!lectureId){
        return res.status(400).json({ status: 'Bad Request'});
    }
    const lecture = await Attendance.findOne({ lecture: lectureId }).populate({
        path: 'students.Id',
        model: 'Student',
        select: 'name'
    }).lean();
    const lectureAttendance = lecture.students.map(item => {
        const { Id: { _id: Id, ...IdRest }, _id, ...newItem } = item;
        return { Id: IdRest, ...newItem  };
    });
    
    return res.status(200).json(lectureAttendance);
}

exports.markPresent = async(req,res) => {
    const { moodleId, lectureId } = req.body;
    if(!moodleId || !lectureId){
        return res.status(400).json({ status: 'Bad Request'});
    }
    const currentStudent = await Student.findOne({moodleId:moodleId})
    const attendance = await Attendance.findOne({ lecture:lectureId, "students.Id": currentStudent._id });

        if (!attendance || attendance.students.length === 0) {
            const newStudentEntry = {
                Id: currentStudent._id,
                Count: 0,
                Present: true
            };

        const updatedAttendance = await Attendance.findOneAndUpdate(
            { lecture: lectureId },
            { $push: { students: newStudentEntry } },
            { new: true, upsert: true }
        );

        return res.status(200).json({ status: 'success', message: 'You have been marked present' });
        } else {
            await Attendance.findOneAndUpdate(
                { _id: attendance._id, "students.Id": currentStudent._id },
                { $set: { "students.$.Present": true } },
                { new: true }
            );

            return res.status(200).json({ status: 'success', message: 'You have been marked present' });
        }
    
}

exports.countAttendance = async (req, res) => {
    const { uuid } = req.body;
    const currentStudent = await Student.findOne({ moodleId: req.student.moodleId }).exec();

    try {
        const beacon = await Beacon.findOne({ Id: uuid });
        if(!beacon){
            return res.status(404).json({status: "Beacon not found", message: "Please make sure beaconid is correct"})
        }
        room = beacon.RoomNo
        
        const currentDate = new Date();
        const lectureDetails = await Lecture.findOne({
            department: currentStudent.department,
            year: currentStudent.year,
            division: currentStudent.division,
            StartTime: { $lt: currentDate },
            EndTime: { $gt: currentDate },
            roomNo: room
          })
        
        if(!lectureDetails){
            return res.status(404).json({status: 'inactive or not found', message: 'You do not have a lecture in this room right now!'})
        }
        lecture = lectureDetails._id
        
        const attendance = await Attendance.findOne({ lecture, "students.Id": currentStudent._id });

        if (!attendance || attendance.students.length === 0) {
            const newStudentEntry = {
                Id: currentStudent._id,
                Count: 1
            };

            const updatedAttendance = await Attendance.findOneAndUpdate(
                { lecture },
                { $push: { students: newStudentEntry } },
                { new: true, upsert: true }
            );

            return res.status(200).json({ status: 'success', message: 'Created and Counted' });
        } else {
            const attendee = await Attendance.findOneAndUpdate(
                { _id: attendance._id, "students.Id": currentStudent._id },
                { $inc: { 'students.$.Count': 1 } },
                { new: true }
            );
            const index = attendance.students.findIndex(s => s.Id.equals(currentStudent._id));
            if (attendance.students[index].Count >= lectureDetails.minimumTime) {
                await Attendance.findOneAndUpdate(
                    { _id: attendance._id, "students.Id": currentStudent._id },
                    { $set: { "students.$.Present": true } },
                    { new: true }
                );

                return res.status(200).json({ status: 'success', message: 'You have been marked present' });
            } else {
                return res.status(200).json({ status: 'success', message: 'Counted' });
            }
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', error: error.message });
    }
};