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
