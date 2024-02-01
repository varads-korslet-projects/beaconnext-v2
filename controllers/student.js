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
        if(!student){
            res.status(404).json({error: "Moodle ID does not exist!"});
            return;
        }
        if(student.deviceId=="NULL"){
            console.log(student.hash_password,oldPassword, student )
            if(student.hash_password == oldPassword ){
                hashed_password = bcrypt.hashSync(newPassword, 10);
                await Student.findOneAndUpdate({moodleId:moodleId}, {hash_password:hashed_password, deviceId: deviceId})
                const token = jwt.sign({ moodleId: student.moodleId, name: student.name, _id: student._id , role: "student"},  process.env.signingkey, { expiresIn: '1d' })
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
        if(!student){
            res.status(404).json({error: "Moodle ID does not exist!"});
            return;
        }
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
                const token = jwt.sign({ moodleId: student.moodleId, name: student.name, _id: student._id, role: "student" },  process.env.signingkey, { expiresIn: '1d' })
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