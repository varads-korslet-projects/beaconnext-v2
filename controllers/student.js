var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  bcrypt = require('bcrypt')
const Student = require('../models/student')

exports.createStudentAccounts = async(req,res) => {
    try {
        const passkey = req.headers['passkey'];
        if(passkey == "AHJ5O3WuVFyvSIZy186SZxbq46N"){
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
            const token = jwt.sign({ moodleId: student.moodleId, name: student.name, _id: student._id }, 'KORSLETRESTFULAPIs')
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
                const token = jwt.sign({ moodleId: student.moodleId, name: student.name, _id: student._id }, 'KORSLETRESTFULAPIs')
                res.status(201).json({success: "Login successful", token});
            }
            else{
                res.status(401).json({error: "Wrong Id or Password"});
            }
        }else{
            res.status(401).json({error: "Login with the same device"});
        }
        return res.json({ token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id }, 'KORSLETRESTFULAPIs') });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
// exports.createOrUpdateStudent = async (req,res)=>{
//     const {email, name, moodleId} =req.student;
//     const student = await Student.findOneAndUpdate({email}, {name} , {moodleId});

//     if(student){
//         console.log('STUDENT UPDATED');
//         res.json(student);
//     }else{
//         const newStudent = await new Student({
//             email,
//             name,
//             moodleId
//         }).save();
//         console.log("New Student created----");
//         res.json(newStudent);
//     }
// }

exports.currentStudent = async (req, res) => {
    Student.findOne({moodleId: req.student.moodleId}).exec((err, student)=>{
        if (err) throw new Error(err);
        res.json(student);
    });
}

exports.getAll = async (req, res) => {
    res.status(201).json({"hiii":"hello"});
}