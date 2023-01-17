const mongoose = require('mongoose')

const characterSchema = mongoose.Schema({
  chr_nm: {
    type: String,
    required: true
  },
  grp_id: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('character', characterSchema)