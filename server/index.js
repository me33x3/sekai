const express = require('express')
const app = express()
const port = 5000

const config = require('./config/key')

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI)
.then(() => console.log('Mongo DB Connected ...'))
.catch((err) => console.log(err))

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Server is running on port ${port}`))