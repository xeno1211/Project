/*
Author: Jeremy Heiner
Class: IFT 458/598: Middleware Programming & Database Security
Professor: Dinesh Sthapit
Description: This is the server JavaScript file. It's the "home" of the entire application.
It tells the application how to connect to the DB and how to route requests to the right routers,
which then will call functions based on what type of request the user is sending.
*/


//set environment variables
const dotenv = require('dotenv')
dotenv.config({ path: './config.env'})
 
//Template for node.js express server
const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false}))

const path = require('path')

const morgan = require('morgan-body')

var rfs = require('rotating-file-stream')

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d', 
    path: path.join(__dirname, 'log')
})

morgan(app, {
    stream: accessLogStream,
    noColors: true,
    logReqUserAgent: true,
    logRequestBody: true,
    logResponseBody: true,
    logReqCookies: true,
    logReqSignedCookies: true
})

app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs')

app.set('views', 'views')

const authenticationRoute = require('./routes/authenticationRoute')
app.use('/', authenticationRoute)

app.use((err, req, res, next)=> {
    res.status(404).render('404', {pageTitle: 'Page Not Found'})
})

//routes
const loanRoute = require('./routes/loanRoute')
app.use('/loan', loanRoute)

const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://jh:UdJSuvfxvgQzIFIN@cluster0.txcchdp.mongodb.net/loanDB',{useNewUrlParser: true})
    .then(()=> console.log("MongoDB connection successful"))
    .catch((err) => console.log(err))

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`App running on port ${port}...`)
})


