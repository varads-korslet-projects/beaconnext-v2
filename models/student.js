const mongoose = require('mongoose'),
bcrypt = require('bcrypt')

const studentSchema = new mongoose.Schema({
    name: String,
    email: {
        type : String,
        unique:true,
        lowercase: true,
        required: true,
        index: true,
    },
    moodleId:{
        type : Number,
        required: true,
        index : true,
    },
    deviceId:{
        type : String,
        unique:true,
    },
    hash_password: {
        type: String
    },
},
{timestamps:true}
);

studentSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.hash_password);
  };
  
module.exports = mongoose.model('Student', studentSchema)