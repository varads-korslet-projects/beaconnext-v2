const express= require('express')
const bodyParser= require('body-parser')
const cors= require('cors')
const {readdirSync} = require('fs')
require('dotenv').config()
const mongoose = require('mongoose')


//app
const app = express()


//db
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> console.log("DB CONNECTED"))
.catch(err => console.log("DB CONNECTION ERROR", err));

//middleware
app.use(bodyParser.json({limit:"2mb"}));
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));

//routes
readdirSync('./routes').map((r)=>
app.use("/api", require("./routes/" + r)));

//PORT
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));