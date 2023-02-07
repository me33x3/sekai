const mongoose = require('mongoose')

const futureSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  pick_up_card_id: {
    type: Array,
    required: true
  },
  available_from: {
    type: Date,
    required: true
  },
  available_until: {
    type: Date,
    required: true
  },
  banner: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('future', futureSchema, 'future')