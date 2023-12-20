require('dotenv').config();
const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body } = require('express-validator');
const validate = require('../../../middleware/spellCheck'); // мидлвара валидатор
const { Token, User } = require('../../../db/models');

router.post(
  '/register',
  validate(
    // [
    // отправляем почту на валидацию
    // body('email').isEmail().withMessage('Не верный формат адреса электронной  почты'),
    // отправляем пароль на валидацию
    // body('password').isLength({ min: 6 }).withMessage('Пароль должен содержать минимум 6 символов'),
  // ]
  ),
  async (req, res) => {
    const { email, password } = req.body;
    try {
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        res.status(409).json({
          // 409 Conflict
          message: `email = ${email} уже занят`,
        });
        return;
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      let activationString = await bcrypt.hash(email, salt);
      activationString = activationString.replace(/[^a-zA-Z0-9]+/g, '');

      const newUser = await User.create({
        email,
        password: hashedPassword,
      });

      const refreshToken = jwt.sign(
        { id: newUser.id, email },
        process.env.JWT_REFRESH,
        { expiresIn: '7d' },
      );
      const accessToken = jwt.sign(
        { id: newUser.id, email },
        process.env.JWT_ACCESS,
        { expiresIn: '1h' },
      );
      const newToken = await Token.create({ refreshToken });
      res.cookie('refreshToken', refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        secure: true,
        sameSite: 'None',
      });
      res.status(201).json({
        // 201 created
        id: newUser.id,
        email,
        refreshToken,
        accessToken,
        message: `Пользователь с email = ${email} зарегистрирован`,
      });
    } catch (e) {
      res.status(500).send(e.message);
    }
  },
);

module.exports = router;
