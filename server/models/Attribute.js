const mongoose = require('mongoose')

const attributeSchema = mongoose.Schema({
  attr_id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('attribute', attributeSchema)