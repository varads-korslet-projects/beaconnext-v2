var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  bcrypt = require('bcrypt')
const Teacher = require('../models/teacher')

exports.createTeacherAccounts = async(req,res) => {
    try {
        const passkey = req.headers['passkey'];
        if(passkey == process.env.passkeyTeacher){
            const teachers = req.body;
            const result = await Teacher.insertMany(teachers);
            res.status(201).json(result);
        }else{
            res.status(500).json({ error: 'Internal Server Error' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
      }
}

exports.firstLogin = async (req,res)=>{
    const {email, oldPassword, newPassword} =req.body;
    console.log(req.body);
    try{
        const teacher = await Teacher.findOne({email:email});
        if(!teacher){
            res.status(404).json({error: "Email ID does not exist!"});
            return;
        }
        console.log(teacher.hash_password,oldPassword);
        if(teacher.hash_password == oldPassword ){
            hashed_password = bcrypt.hashSync(newPassword, 10);
            await Teacher.findOneAndUpdate({email:email}, {hash_password:hashed_password})
            const token = jwt.sign({ email: teacher.email, name: teacher.name, _id: teacher._id , role: "teacher"},  process.env.signingkey)
            res.status(201).json({success: "Your password was changed successfully", token});
        }
        else{
            res.status(401).json({error: "Wrong Id or Password"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
}

exports.teacherLogin = async (req,res)=>{
    const {email, password} = req.body;
    try{
        const teacher = await Teacher.findOne({email:email});
        if(!teacher){
            res.status(404).json({error: "Email ID does not exist!"});
            return;
        }
        if(teacher==null){
            res.status(401).json({error: "Wrong Id or Password"});
        }
            const match = await bcrypt.compare(password, teacher.hash_password)
            if(match){
                const token = jwt.sign({ email: teacher.email, name: teacher.name, _id: teacher._id, role: "teacher" },  process.env.signingkey)
                res.status(201).json({success: "Login successful", token});
            }
            else{
                res.status(401).json({error: "Wrong Id or Password"});
            }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
}

exports.currentTeacher = async (req, res) => {
    try {
        const currentTeacher = await Teacher.findOne({ email: req.teacher.email }).exec();
        res.json(currentTeacher);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
