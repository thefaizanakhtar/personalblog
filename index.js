const express = require("express")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const morgan = require("morgan")
const mongoStore = require("connect-mongo")(session)
const path = require("path")
const config = require("./config/database")

const mongoose = require("mongoose")
mongoose.connect(config.database)
mongoose.Promise = global.Promise

const user = require("./routes/user")

const port = process.env.PORT || 8080

const app = express()


app.set('views',path.join(__dirname,'views'))
app.set('view engine', 'ejs')

app.use(morgan('dev'))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())
app.use('/public',express.static('public'))
app.use('/uploads',express.static('uploads'))
app.use(cookieParser())

app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested, Content-Type,Accept,Authorization');
    if(req.method == 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE, GET');
        return res.status(200).json({});
    }
    next();
});



app.use('/',user)


app.listen(port)