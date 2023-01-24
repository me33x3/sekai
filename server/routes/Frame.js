const router = require('express').Router()
const Frame = require('../models/Frame')

router.get('/', async (req, res) => {
  const frames = await Frame.find().sort({ frm_id: 1})
  res.status(200).json(frames)
})

module.exports = router