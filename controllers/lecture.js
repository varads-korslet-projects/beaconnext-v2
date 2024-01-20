var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  bcrypt = require('bcrypt')
const Lecture = require('../models/lecture')

exports.createLecture = async(req,res) => {
    try {
        const lecture = req.body;
        const result = await Lecture.create(lecture);
        res.status(201).json(result); 
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}