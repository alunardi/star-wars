const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const planet = require('./src/routes/planet.route')

require('dotenv').config()

let mongoDB = process.env.MONGODB_URI

mongoose.connect(mongoDB, {useNewUrlParser: true})
mongoose.set('useFindAndModify', false)
mongoose.Promise = global.Promise

const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.listen(3030, () => {
    console.log('Server on port 3030')
})

app.use('/planet', planet)
