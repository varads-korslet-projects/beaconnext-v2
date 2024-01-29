var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  bcrypt = require('bcrypt')
const Lecture = require('../models/lecture')

exports.createLecture = async (req, res) => {
  try {
    const { subjectName, StartTime, EndTime, year, division, class: lectureClass, minimumTime } = req.body;

    // Extract teacher ID from the authenticated request
    const teacherId = req.teacher._id;

    const lecture = {
      subjectName,
      teacher: teacherId,
      StartTime,
      EndTime,
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