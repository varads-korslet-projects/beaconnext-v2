const jwt = require('jsonwebtoken');

exports.authCheckStudent = async (req, res, next) =>{
  const token = req.headers['authorization'];
  if (!token) {
        return res.status(401).json({ error: 'Unauthorized - Missing Authorization header' });
      }
      jwt.verify(token, process.env.signingkey, (err, student) => {
        if (err) {
          return res.status(403).json({ error: 'Forbidden - Invalid token' });
       }
       if(student.role == "student"){
        req.student = student;
        next();
       }else{
        return res.status(403).json({ error: 'Forbidden - Unauthorized' });
       }
    });
};

exports.authCheckTeacher = async (req, res, next) =>{
  const token = req.headers['authorization'];
  if (!token) {
      return res.status(401).json({ error: 'Unauthorized - Missing Authorization header' });
    }
    jwt.verify(token, process.env.signingkey, (err, teacher) => {
      if (err) {
        return res.status(403).json({ error: 'Forbidden - Invalid token' });
     }
     //teacher role remaining
     if(teacher.role == "teacher"){
      req.teacher = teacher;
      next();
     }else{
      return res.status(403).json({ error: 'Forbidden - Unauthorized' });
     }

  });
};