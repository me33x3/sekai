const router = require('express').Router()
const Rarity = require('../models/Rarity')

router.get('/', async (req, res) => {
  const rarity = await Rarity.find().sort({ id: 1 })
  res.status(200).json(rarity)
})

module.exports = router