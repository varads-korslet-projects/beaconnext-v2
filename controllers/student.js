var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  bcrypt = require('bcrypt')
const Student = require('../models/student')
const Attendance = require('../models/attendance');
const Lecture = require('../models/lecture')

exports.createStudentAccounts = async(req,res) => {
    try {
        const passkey = req.headers['passkey'];
        if(passkey == process.env.passkeyStudent){
            const students = req.body;
            const result = await Student.insertMany(students);
            res.status(201).json(result);
        }else{
            res.status(500).json({ error: "Wrong passkey" });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
      }
}
exports.firstLogin = async (req,res)=>{
    const {moodleId, oldPassword, newPassword, deviceId} =req.body;
    try{
        const student = await Student.findOne({moodleId:moodleId});
        if(!student.deviceId){
            console.log(student.hash_password,oldPassword, student )
            if(student.hash_password == oldPassword ){
                hashed_password = bcrypt.hashSync(newPassword, 10);
                await Student.findOneAndUpdate({moodleId:moodleId}, {hash_password:hashed_password, deviceId: deviceId})
                const token = jwt.sign({ moodleId: student.moodleId, name: student.name, _id: student._id , role: "student"},  process.env.signingkey)
                res.status(201).json({success: "Your password was changed successfully", token, deviceId});
            }
            else{
                res.status(401).json({error: "Wrong Id or Password"});
            }
        } else {
            res.status(403).json({error: "Can only do first login once"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
}

exports.studentLogin = async (req,res)=>{
    const {moodleId, password, deviceId} = req.body;
    try{
        const student = await Student.findOne({moodleId:moodleId});
        if(student==null){
            res.status(401).json({error: "Wrong Id or Password"});
        }
        if (!student.deviceId) {
            res.status(401).json({ error: "Please do first login first" });
            return;
        }
        if(student.deviceId == deviceId){
            const match = await bcrypt.compare(password, student.hash_password)
            if(match){
                const token = jwt.sign({ moodleId: student.moodleId, name: student.name, _id: student._id, role: "student" },  process.env.signingkey)
                res.status(201).json({success: "Login successful", token});
            }
            else{
                res.status(401).json({error: "Wrong Id or Password"});
            }
        }else{
            res.status(401).json({error: "Login with the same device"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
}

exports.countAttendance = async (req, res) => {
    const { lecture } = req.body;
    const studentId = req.student.moodleId;

    try {
        const lectureDetails = await Lecture.findOne({ _id: lecture });
        const currentDate = new Date();

        if (currentDate >= lectureDetails.StartTime && currentDate <= lectureDetails.EndTime) {
            const attendance = await Attendance.findOne({ lecture, "students.Id": studentId });

            if (!attendance || attendance.students.length === 0) {
                const newStudentEntry = {
                    Id: studentId,
                    Count: 0
                };

                const updatedAttendance = await Attendance.findOneAndUpdate(
                    { lecture },
                    { $push: { students: newStudentEntry } },
                    { new: true, upsert: true }
                );

                return res.status(200).json({ status: 'success', message: 'Created and Counted' });
            } else {
                const attendee = await Attendance.findOneAndUpdate(
                    { _id: attendance._id, "students.Id": studentId },
                    { $inc: { 'students.$.Count': 1 } },
                    { new: true }
                );

                if (attendee.students.Count > lectureDetails.minimumTime) {
                    await Attendance.findOneAndUpdate(
                        { _id: attendance._id, "students.Id": studentId },
                        { $set: { "students.$.Present": true } },
                        { new: true }
                    );

                    return res.status(200).json({ status: 'success', message: 'You have been marked present' });
                } else {
                    return res.status(200).json({ status: 'success', message: 'Counted' });
                }
            }
        } else {
            return res.status(401).json({ status: 'error', error: 'Lecture is Inactive' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', error: error.message });
    }
};

exports.currentStudent = async (req, res) => {
    try {
        const student = await Student.findOne({ moodleId: req.student.moodleId }).exec();
        res.json(student);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getAll = async (req, res) => {
    try {
        const passkey = req.headers['passkey'];
        if(passkey == process.env.passkeyStudent){
            const students = await Student.find();
            res.status(200).json(students);
        }else{
            res.status(500).json({ error: "Wrong passkey" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
};

exports.test = async (req, res) => {
    try {
        res.status(200).json({"online":"true"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
};