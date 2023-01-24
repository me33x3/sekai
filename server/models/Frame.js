const mongoose = require('mongoose')

const frameSchema = mongoose.Schema({
  frm_id: {
    type: Number,
    require: true,
    unique: true
  },
  frame: {
    type: String,
    require: true
  }
})

module.exports = mongoose.model('frame', frameSchema)