/* eslint-disable linebreak-style */
const router = require('express').Router()
const { User } = require('../../db/models')

router
  .route('users/:id')
  .put(async (req, res) => {
    try {
      const { id } = req.params
      const user = await User.update(req.body, { where: { id } })
      res.json(user)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  })
  .delete(async (req, res) => {
    try {
      const { id } = req.params
      const user = await User.destroy({ where: { id } })
      res.json(user)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  })

module.exports = router
