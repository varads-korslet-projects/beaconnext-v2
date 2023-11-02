const Student = require('../models/student')

exports.createOrUpdateStudent = async (req,res)=>{
    const {email, name, moodleId} =req.student;
    const student = await Student.findOneAndUpdate({email}, {name} , {moodleId});

    if(student){
        console.log('STUDENT UPDATED');
        res.json(student);
    }else{
        const newStudent = await new Student({
            email,
            name,
            moodleId
        }).save();
        console.log("New Student created----");
        res.json(newStudent);
    }
}

exports.currentStudent = async (req, res) => {
    Student.findOne({email: req.student.email}).exec((err, student)=>{
        if (err) throw new Error(err);
        res.json(student);
    });
}