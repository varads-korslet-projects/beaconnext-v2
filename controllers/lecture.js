var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  bcrypt = require('bcrypt')
const Lecture = require('../models/lecture')
const Teacher = require('../models/teacher')
const Student = require('../models/student')

exports.createLecture = async (req, res) => {
  try {
    const { subjectName, StartTime, EndTime, department, year, division, class: lectureClass, minimumTime } = req.body;

    // Extract teacher ID from the authenticated request
    const teacherId = req.teacher._id;

    const lecture = {
      subjectName,
      teacher: teacherId,
      StartTime,
      EndTime,
      department,
      year,
      division,
      class: lectureClass,
      minimumTime
    };

    const result = await Lecture.create(lecture);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
}

exports.lectureStatus = async (req, res) => {
  try {
    const { lecture } = req.body;
    const passkey = req.headers['passkey'];
    if(passkey == process.env.passkeyStudent){
      const lectureDetails = await Lecture.findOne({ _id: lecture });
      const currentDate = new Date();
      if (!lectureDetails) {
        return res.status(404).json({ status: "Not Found!" });
      }
      if (currentDate >= lectureDetails.StartTime && currentDate <= lectureDetails.EndTime) {
        return res.status(200).json({ status: 'ongoing'});
      } else {
          return res.status(200).json({ status: 'inactive'});
      }
    }else{
        res.status(500).json({ error: "Wrong passkey" });
    }
  } 
  catch (error) {
      console.error(error);
      return res.status(500).json({ status: 'error', error: error.message });
  }
}

exports.upcomingLecturesTeacher = async (req, res) => {
  try {
    const currentTeacher = await Teacher.findOne({ email: req.teacher.email }).exec();

    const currentDate = new Date();

    // Find upcoming lectures for a specific teacher where StartTime is greater than the current date
    const upcomingLectures = await Lecture.find({
      teacher: currentTeacher._id,
      StartTime: { $gt: currentDate },
      EndTime: { $gt: currentDate }
    }).sort({ StartTime: 1 }).lean();

    for (let i = 0; i < upcomingLectures.length; i++) {
      const teacher = await Teacher.findById(upcomingLectures[i].teacher).exec();
      if (teacher) {
        // Add lecturer property to the lecture object
        upcomingLectures[i].lecturer = teacher.name;
      } else {
        // Handle the case where the teacher is not found
        upcomingLectures[i].lecturer = "Unknown";
      }
    }

    res.status(200).json(upcomingLectures);

  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', error: error.message });
  }
}

exports.ongoingLecturesTeacher = async (req, res) => {
  try {
    const currentTeacher = await Teacher.findOne({ email: req.teacher.email }).exec();

    const currentDate = new Date();

    const upcomingLectures = await Lecture.find({
      teacher: currentTeacher._id,
      StartTime: { $lt: currentDate },
      EndTime: { $gt: currentDate }
    }).sort({ StartTime: 1 }).lean();

    for (let i = 0; i < upcomingLectures.length; i++) {
      const teacher = await Teacher.findById(upcomingLectures[i].teacher).exec();
      if (teacher) {
        // Add lecturer property to the lecture object
        upcomingLectures[i].lecturer = teacher.name;
      } else {
        // Handle the case where the teacher is not found
        upcomingLectures[i].lecturer = "Unknown";
      }
    }

    upcomingLectures.lecturer = currentTeacher.name
    res.status(200).json(upcomingLectures);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', error: error.message });
  }
}


exports.ongoingLecturesStudent = async (req, res) => {
  try {
    const currentStudent = await Student.findOne({ moodleId: req.student.moodleId }).exec();

    const currentDate = new Date();

    const upcomingLectures = await Lecture.find({
      department: currentStudent.department,
      year: currentStudent.year,
      division: currentStudent.division,
      StartTime: { $lt: currentDate },
      EndTime: { $gt: currentDate }
    }).sort({ StartTime: 1 }).lean();

    // Iterate through each lecture and fetch teacher's name
    for (let i = 0; i < upcomingLectures.length; i++) {
      const teacher = await Teacher.findById(upcomingLectures[i].teacher).exec();
      if (teacher) {
        // Add lecturer property to the lecture object
        upcomingLectures[i].lecturer = teacher.name;
      } else {
        // Handle the case where the teacher is not found
        upcomingLectures[i].lecturer = "Unknown";
      }
    }

    res.status(200).json(upcomingLectures);

  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', error: error.message });
  }
}

exports.upcomingLecturesStudent = async (req, res) => {
  try {
    const currentStudent = await Student.findOne({ moodleId: req.student.moodleId }).exec();

    const currentDate = new Date();

    const upcomingLectures = await Lecture.find({
      department: currentStudent.department,
      year: currentStudent.year,
      division: currentStudent.division,
      StartTime: { $gt: currentDate },
      EndTime: { $gt: currentDate }
    }).sort({ StartTime: 1 }).lean();

    for (let i = 0; i < upcomingLectures.length; i++) {
      const teacher = await Teacher.findById(upcomingLectures[i].teacher).exec();
      if (teacher) {
        // Add lecturer property to the lecture object
        upcomingLectures[i].lecturer = teacher.name;
      } else {
        // Handle the case where the teacher is not found
        upcomingLectures[i].lecturer = "Unknown";
      }
    }

    res.status(200).json(upcomingLectures);

  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', error: error.message });
  }
}

exports.historyLecturesStudent = async (req, res) => {
  try {
    const currentStudent = await Student.findOne({ moodleId: req.student.moodleId }).exec();

    const currentDate = new Date();

    const upcomingLectures = await Lecture.find({
      department: currentStudent.department,
      year: currentStudent.year,
      division: currentStudent.division,
      StartTime: { $lt: currentDate },
      EndTime: { $lt: currentDate }
    }).sort({ StartTime: 1 }).lean();

    for (let i = 0; i < upcomingLectures.length; i++) {
      const teacher = await Teacher.findById(upcomingLectures[i].teacher).exec();
      if (teacher) {
        // Add lecturer property to the lecture object
        upcomingLectures[i].lecturer = teacher.name;
      } else {
        // Handle the case where the teacher is not found
        upcomingLectures[i].lecturer = "Unknown";
      }
    }

    res.status(200).json(upcomingLectures);

  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', error: error.message });
  }
}

exports.historyLecturesTeacher = async (req, res) => {
  try {
    const currentTeacher = await Teacher.findOne({ email: req.teacher.email }).exec();

    const currentDate = new Date();

    const upcomingLectures = await Lecture.find({
      teacher: currentTeacher._id,
      StartTime: { $lt: currentDate },
      EndTime: { $lt: currentDate }
    }).sort({ StartTime: 1 }).lean();

    for (let i = 0; i < upcomingLectures.length; i++) {
      const teacher = await Teacher.findById(upcomingLectures[i].teacher).exec();
      if (teacher) {
        // Add lecturer property to the lecture object
        upcomingLectures[i].lecturer = teacher.name;
      } else {
        // Handle the case where the teacher is not found
        upcomingLectures[i].lecturer = "Unknown";
      }
    }

    upcomingLectures.lecturer = currentTeacher.name
    res.status(200).json(upcomingLectures);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', error: error.message });
  }
}