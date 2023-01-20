const mongoose = require('mongoose')

const characterSchema = mongoose.Schema({
  chr_id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  birthday: {
    type: String,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  school: {
    type: String
  },
  class: {
    type: String
  },
  hobby: {
    type: Array
  },
  specialty: {
    type: Array
  },
  favorite_food: {
    type: Array
  },
  disliked_food: {
    type: Array
  },
  weakness: {
    type: Array
  },
  sd: {
    type: String,
    required: true
  },
  grp_id: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('character', characterSchema)