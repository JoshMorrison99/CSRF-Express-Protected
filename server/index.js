const express = require('express')
const session = require('express-session')
const MongoDBSession = require('connect-mongodb-session')(session)
const cors = require('cors')
const axios = require('axios')
require('dotenv').config();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose')
const User = require('./models/user.js')
const Browser = require('zombie');
var csrf = require('csurf')
const app = express()
const port = 5000


app.use(cors({ origin: 'http://localhost:3000', methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"], credentials: true }))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.set('strictQuery', true);
mongoURI = null
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
    mongoURI = 'mongodb://localhost:27017/csrf'
    mongoose.connect(mongoURI, { useNewUrlParser: true, })
} else {
    mongoURI = process.env.MONGO_URL
    mongoose.connect(mongoURI, { useNewUrlParser: true, })
}

const CreateDefaultUsers = () => {
    try {
        User.create({
            username: "guest",
            password: "guest"
        })
        User.create({
            username: "support",
            password: "639Mydd&ou6Y"
        })
        console.log("User Created...")
    } catch (err) {
        console.log("Error creating users")
    }
}

var csrfProtection = csrf({ cookie: true })
app.use(csrfProtection);

const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to Database'), CreateDefaultUsers())

const store = new MongoDBSession({
    uri: mongoURI,
    collection: 'csrf-sessions'
})

app.use(session({
    name: "SESS_COOKIE",
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, secure: false, httpOnly: false, sameSite: false
    }
}))


app.post('/api/login', async (req, res) => {
    console.log(req.session)
    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    })
    if (user) {
        req.session.userId = user._id.toString();
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
        res.status(200).json({ status: "Successful Login" });
    } else {
        res.status(403).json({ status: "Invalid Login" });
    }
})

app.post('/api/login-support', async (req, res) => {
    console.log(req.session)
    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    })
    if (user) {
        req.session.userId = user._id.toString();
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
        res.send(req.session)
    } else {
        res.status(403).json({ status: "Invalid Login" });
    }
})

app.get('/api/me', async (req, res) => {
    const user = await User.findById(req.session.userId)
    if (user) {
        res.status(200).json({ username: user.username })
    } else {
        res.status(403).json({ status: "Failed me" });
    }
})

app.post('/api/reset_password', async (req, res) => {
    const newPassword = req.body.password
    const user = await User.findById(req.session.userId)
    if (user) {
        user.password = newPassword
        await user.save();
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
        res.status(200).json({ status: "Password Updated" })
    } else {
        res.status(403).json({ status: "Password Update Failed" });
    }
})


app.post('/api/support', async (req, res) => {

    const reset = async (cookie) => {

        const browser = new Browser();
        browser.setCookie({ name: 'SESS_COOKIE', value: cookie });
        browser.visit(req.body.url, () => {
            console.log('Browser is visiting URL')
        });

    }

    axios.post('http://localhost:5000/api/login-support', { username: "support", password: "639Mydd&ou6Y" }, { withCredentials: true })
        .then((data) => {
            const cookie = data.headers['set-cookie'][0].split(";")[0].split("SESS_COOKIE=")[1]
            console.log(cookie)
            reset(cookie)
        })
})




app.get('/api/csrf-token', (req, res) => {
    res.json({ CSRFToken: req.csrfToken() });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})