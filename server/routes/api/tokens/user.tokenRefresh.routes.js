require('dotenv').config();
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { Token, User } = require('../../db/models');

router.get('token/refresh', async (req, res) => {
  const { refreshToken } = req.cookies;
  try {
    if (!refreshToken) {
      res.status(401).json({
        // 401 Unauthorized
        message: 'Refresh токен не предоставлен',
      });
      return;
    }
    const { id, email, isActivated } = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH,
    );
    const token = await Token.findOne({ where: { refreshToken } });
    if (!token || !email || !id) {
      res.status(401).json({
        // 401 Unauthorized
        message: 'Refresh токен не прошёл проверку',
      });
      return;
    }
    const userToRefresh = await User.findOne({ where: { id: token.userId } });
    const newRefreshToken = jwt.sign(
      { id: userToRefresh.id, email, isActivated: userToRefresh.isActivated },
      process.env.JWT_REFRESH,
      { expiresIn: '7d' },
    );
    const newAccessToken = jwt.sign(
      { id: userToRefresh.id, email, isActivated: userToRefresh.isActivated },
      process.env.JWT_ACCESS,
      { expiresIn: '1h' },
    );
    token.refreshToken = newRefreshToken;
    await token.save();

    res.cookie('refreshToken', newRefreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });
    res.status(200).json({
      id: userToRefresh.id,
      email,
      isActivated,
      refreshToken: newRefreshToken,
      accessToken: newAccessToken,
      message: `токены для пользователя с email = ${userToRefresh.email} обновлены`,
    });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = router;
