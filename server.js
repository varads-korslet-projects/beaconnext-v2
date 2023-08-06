const express= require('express')
// const mongoose= require('mongoose')
const morgan= require('morgan')
const bodyParser= require('body-parser')
const cors= require('cors')
const {readdirSync} = require('fs')
// require('dotenv').config()
const fileupload = require('express-fileupload'); 
const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set('useFindAndModify', false);

//import route
const authRoutes = require('./routes/auth') 

//app
const app = express()

//file-upload
app.use(fileupload({useTempFiles: true}))

//db
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
})
.then(()=> console.log("DB CONNECTED"))
.catch(err => console.log("DB CONNECTION ERROR", err));

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json({limit:"2mb"}));
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));

//routes
readdirSync('./routes').map((r)=>
app.use("/api", require("./routes/" + r)));

//PORT
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));