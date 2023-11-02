var admin = require("firebase-admin");

if (!admin.apps.length){
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_EMAIL,
            privateKey: process.env.FIREBASE_PK,
        })
    });
} else {
    admin.app();
}