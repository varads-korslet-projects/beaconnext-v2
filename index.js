const express= require('express')
const cors= require('cors')
const rateLimit = require('express-rate-limit')
const {readdirSync} = require('fs')
require('dotenv').config()
const mongoose = require('mongoose')


//app
const app = express()

// Rate Limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 Mins
    max: 500
})

//db
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> console.log("DB CONNECTED"))
.catch(err => console.log("DB CONNECTION ERROR", err));

//middleware
app.use(express.json({limit:"2mb"}));
app.use(cors());
app.set('trust proxy', 1);

//routes
readdirSync('./routes').map((r)=>
app.use("/api", require("./routes/" + r)));

//PORT
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));