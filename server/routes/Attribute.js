const router = require('express').Router()
const Attribute = require('../models/Attribute')

router.get('/', async (req, res) => {
  const attributes = await Attribute.find().sort({ attr_id: 1 })
  res.status(200).json(attributes)
})

module.exports = router