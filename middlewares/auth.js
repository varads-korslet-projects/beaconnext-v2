const Student = require('../models/student');
const jwt = require('jsonwebtoken');

exports.authCheck = async (req, res, next) =>{
    // console.log(req.headers);
    // // next();
    // try{
    //     const firebaseUser = await admin
    //     .auth()
    //     .verifyIdToken(req.headers.authtoken);
    //     console.log("FIREBASE USER IN AUTHCHECK", firebaseUser);
    //     req.student = firebaseUser;
    //     next();
    // }catch(err){
    //     res.status(401).json({
    //         err: "Invalid or expired token ",
    //     });
    // }

    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ error: 'Unauthorized - Missing Authorization header' });
      }
      jwt.verify(token, process.env.signingkey, (err, student) => {
        if (err) {
          return res.status(403).json({ error: 'Forbidden - Invalid token' });
       }
       //teacher role
       req.student = student;
       next();
    });
};
