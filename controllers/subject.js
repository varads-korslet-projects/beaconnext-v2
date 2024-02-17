
const Subject = require('../models/subject')

exports.addSubject = async (req, res) => {
  try {
      const passkey = req.headers['passkey'];
      if (passkey == process.env.passkeyAdmin && req.body) {
          const subjects = req.body;
          const result = await Subject.insertMany(subjects);
          res.status(201).json(result);
      } else {
          res.status(500).json({ error: "Wrong passkey or empty request body" });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
  }
}
