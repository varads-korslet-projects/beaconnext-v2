const admin = require('../firebase');
const Student = require('../models/student');

exports.authCheck = async (req, res, next) =>{
    console.log(req.headers);
    // next();
    try{
        const firebaseUser = await admin
        .auth()
        .verifyIdToken(req.headers.authtoken);
        console.log("FIREBASE USER IN AUTHCHECK", firebaseUser);
        req.student = firebaseUser;
        next();
    }catch(err){
        res.status(401).json({
            err: "Invalid or expired token ",
        });
        
    }
};
