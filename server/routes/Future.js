const router = require('express').Router()
const Future = require('../models/Future')

router.get('/', async (req, res) => {
  const future = await Future.find().sort({ available_from: 1 })
  res.status(200).json(future)
})

module.exports = router