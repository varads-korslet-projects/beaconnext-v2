const express = require('express')

const router = express.Router()

//middlewares
const {deleteAllLecture, } = require('../controllers/delete');


router.delete("/delete-lectures", deleteAllLecture);

module.exports = router;