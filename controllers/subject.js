
const Subject = require('../models/subject')

exports.addSubject = async (req, res) => {
  try {
      const passkey = req.headers['passkey'];
      if (passkey == process.env.passkeyAdmin && req.body) {
          const subjects = req.body;
          const result = await Subject.insertMany(subjects);
          return res.status(201).json(result);
      } else {
          return res.status(500).json({ error: "Wrong passkey or empty request body" });
      }
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
  }
}

exports.getSubject = async (req, res) => {
  try {
    if(!req.body.department || !req.body.year || !req.body.division){
        return res.status(400).json({ status: 'Bad Request'});
    }
    const subjects = await Subject.find({
      department: req.body.department,
      year: req.body.year,
      division: req.body.division
    })
    return res.status(200).json({subjects})
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}