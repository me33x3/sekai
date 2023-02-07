const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const characterRouter = require('./routes/Character')
const cardRouter = require('./routes/Card')
const frameRouter = require('./routes/Frame')
const attributeRouter = require('./routes/Attribute')
const rarityRouter = require('./routes/Rarity')
const futureRouter = require('./routes/Future')

require('dotenv').config()

const app = express()

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Mongo DB Connected ...'))
.catch((err) => console.log(err))

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/character', characterRouter)
app.use('/card', cardRouter)
app.use('/frame', frameRouter)
app.use('/attribute', attributeRouter)
app.use('/rarity', rarityRouter)
app.use('/future', futureRouter)

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is running on port ${process.env.SERVER_PORT}`)
})

module.exports = app