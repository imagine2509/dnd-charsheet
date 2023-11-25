/* eslint-disable linebreak-style */
require('dotenv').config()
const router = require('express').Router()
const authCheck = require('../../../middleware/authCheck')

router.get('/access', authCheck, async (req, res) => {
  res.sendStatus(200)
})

module.exports = router
