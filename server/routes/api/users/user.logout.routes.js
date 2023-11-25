require('dotenv').config()
const router = require('express').Router()
const { Token, User } = require('../../db/models')

router.post('/logout', async (req, res) => {
  try {
    const { refreshToken } = req.cookies
    if (!refreshToken) {
      res.status(404).json({
        //404 Not found
        message: `Refresh токен не передан в запросе`,
      })
      return
    }
    const token = await Token.findOne({ where: { refreshToken } })
    if (!token) {
      res.status(404).json({
        //404 Not found
        message: `Refresh токен передан в запросе , но не найден на сервере`,
      })
      return
    }
    const userToLogout = await User.findOne({ where: { id: token.userId } })
    await token.destroy()
    res.clearCookie('refreshToken')
    res
      .status(200)
      .json({ message: `Выход пользователя с email = ${userToLogout.email}` })
  } catch (e) {
    res.status(500).send(e.message)
  }
})

module.exports = router
