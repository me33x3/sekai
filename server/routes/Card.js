const router = require('express').Router()
const Card = require('../models/Card')

router.get('/', async (req, res) => {
  const cards = await Card.find({}).sort({ card_id: 1 })
  res.status(200).json(cards)
})

module.exports = router