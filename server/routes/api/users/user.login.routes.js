require('dotenv').config();
const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Token, User } = require('../../../db/models');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExists = await User.findOne({ where: { email } });
    if (!userExists) {
      res.status(404).json({
        // 404 Not found
        message: 'Пользователь не найден',
      });
      return;
    }
    if (!userExists.isActivated) {
      res.status(403).json({
        // 403 Unauthorized/Inactive
        message: `Активация по ссылке из письма для email = ${email} не произведена`,
      });
      return;
    }
    const checkPassword = await bcrypt.compare(password, userExists.password);
    if (!checkPassword) {
      res.status(401).json({
        // 401 Unauthorized
        message: 'Неверный пароль',
      });
      return;
    }
    const refreshToken = jwt.sign(
      { id: userExists.id, email, isActivated: userExists.isActivated },
      process.env.JWT_REFRESH,
      { expiresIn: '7d' },
    );
    const accessToken = jwt.sign(
      { id: userExists.id, email, isActivated: userExists.isActivated },
      process.env.JWT_ACCESS,
      { expiresIn: '1h' },
    );
    const tokenExists = await Token.findOne({
      where: { userId: userExists.id },
    });
    if (tokenExists) {
      tokenExists.refreshToken = refreshToken;
      tokenExists.save();
    } else {
      const newToken = await Token.create({
        userId: userExists.id,
        refreshToken,
      });
    }
    res.cookie('refreshToken', refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    });
    res.status(200).json({
      id: userExists.id,
      email,
      refreshToken,
      accessToken,
      message: `Успешный вход пользователя с email = ${email}`,
    });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = router;
