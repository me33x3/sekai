const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const characterRouter = require('./routes/Character')

require('dotenv').config()

const app = express()

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Mongo DB Connected ...'))
.catch((err) => console.log(err))

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/character', characterRouter)

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is running on port ${process.env.SERVER_PORT}`)
})

module.exports = app