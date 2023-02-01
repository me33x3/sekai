const mongoose = require('mongoose')

const cardSchema = mongoose.Schema({
  card_id: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  chr_id: {
    type: Number,
    required: true
  },
  attr_id: {
    type: Number,
    required: true
  },
  rarity: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  thumbnails: {
    type: Array,
    required: true
  }
})

module.exports = mongoose.model('card', cardSchema)