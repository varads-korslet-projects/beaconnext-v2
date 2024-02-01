const express = require('express')

const router = express.Router()

//middlewares
const {deleteAllLecture, deleteAllAttendance, } = require('../controllers/delete');

router.delete("/delete-attendances", deleteAllAttendance);
router.delete("/delete-lectures", deleteAllLecture);

module.exports = router;