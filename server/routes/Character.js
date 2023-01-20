const router = require('express').Router()
const Character = require('../models/Character')

router.get("/", async (req, res) => {
  const characters = await Character.find().sort({chr_id: 1})
  res.status(200).json(characters)
});

module.exports = router