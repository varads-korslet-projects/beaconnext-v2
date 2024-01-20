var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  bcrypt = require('bcrypt')
const Student = require('../models/student')
const Attendance = require('../models/attendance');

exports.createStudentAccounts = async(req,res) => {
    try {
        const passkey = req.headers['passkey'];
        if(passkey == process.env.passkeyStudent){
            const students = req.body;
            const result = await Student.insertMany(students);
            res.status(201).json(result);
        }else{
            res.status(500).json({ error: 'Internal Server Error' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}
exports.firstLogin = async (req,res)=>{
    const {moodleId, oldPassword, newPassword, deviceId} =req.body;
    try{
        const student = await Student.findOne({moodleId:moodleId});
        console.log(student.hash_password,oldPassword, student )
        if(student.hash_password == oldPassword ){
            hashed_password = bcrypt.hashSync(newPassword, 10);
            await Student.findOneAndUpdate({moodleId:moodleId}, {hash_password:hashed_password, deviceId: deviceId})
            const token = jwt.sign({ moodleId: student.moodleId, name: student.name, _id: student._id , role: "student"},  process.env.signingkey)
            res.status(201).json({success: "Your password was changed successfully", token});
        }
        else{
            res.status(401).json({error: "Wrong Id or Password"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.studentLogin = async (req,res)=>{
    const {moodleId, password, deviceId} = req.body;
    try{
        const student = await Student.findOne({moodleId:moodleId});
        if(student==null){
            res.status(401).json({error: "Wrong Id or Password"});
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
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.countAttendance = async (req,res)=>{
    const {lecture} = req.body;
    const {student} = req.student.Id;
    try{
        const lectureDetails = await Lecture.findOne({lecture:lecture,});
        const currentDate = new Date();
        if(currentDate >= lectureDetails.StartTime && currentDate <= EndTime){
            const attendance = await Attendance.findOne({lecture:lecture, "student.Id": student});

        if(!attendance && attendance.students.length == 0 ){
            const newStudentEntry = {
                Id: 'student',
                Count: 0 
            };
            const updatedAttendance = await Attendance.findByIdAndUpdate(
                {lecture: lecture},
                { $push: { students: newStudentEntry } },
                { new: true }
            );
            res.status(200).json('Created and Counted');
        }else{
            const attendee = await Attendance.findOneAndUpdate(
                 {_id: attendance.Id, "student.Id": student},
                { $inc: { 'student.Count': 1 } },
                { new: true } 
            )
            if(attendee.student.Count > lectureDetails.minimumTime){
                await Attendance.findOneAndUpdate(
                    {_id: attendance.Id, "student.Id": student},
                    { $set: { "student.Present": true } },
                   { new: true } 
               )
                res.status(200).json('You have been marked present');
            }else{
                res.status(200).json('Counted');
            }
        }
        }
        else{
            res.status(401).json({ error: 'Lecture is Inactive' });
        }

    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

exports.currentStudent = async (req, res) => {
    Student.findOne({moodleId: req.student.moodleId}).exec((err, student)=>{
        if (err) throw new Error(err);
        res.json(student);
    });
}

exports.getAll = async (req, res) => {
    res.status(201).json({"hiii":"hello"});
}