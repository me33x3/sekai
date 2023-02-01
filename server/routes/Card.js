const router = require('express').Router()
const Card = require('../models/Card')

router.get('/', async (req, res) => {
  const cards = await Card.find().sort({ card_id: 1 })
  res.status(200).json(cards)
})

router.get('/type/:type', async (req, res) => {
  let { type } = req.params

  const cards = await Card.find({ type: type.split(',') }).sort({ card_id: 1 })
  
  res.status(200).json(cards)
})

router.get('/chrid/:chrid/type/:type', async (req, res) => {
  let { chrid, type } = req.params

  const cards = await Card.find({ chr_id: chrid, type: type.split(',') }).sort({ card_id: 1 })

  res.status(200).json(cards)
})

module.exports = router