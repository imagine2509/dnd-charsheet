const express = require('express');
const { validationResult, body, checkSchema } = require('express-validator');

const validate = () => async (req, res, next) => {
  const errors = [];

  if (!req.body.email) {
    errors.push({
      message: 'Пустое значение адреса электронной почты',
      name: 'email',
      where: 'body',
      value: req.body.email,
    });
  }
  if (!req.body.password) {
    errors.push({
      message: 'Пустое значение пароля',
      name: 'password',
      where: 'body',
      value: req.body.password,
    });
  }

  if (errors.length) {
    return res.status(400).json({ errors });
  }
};

// "type": "field",
// "value": "",
// "msg": "Неверный формат адреса электронной почты",
// "path": "email",
// "location": "body"
//   const validations = []; // массив уловий для проверок
//   const minPasswordLength = 6; // минимальная длинна пароля
//   // провер очки:
//   validations.push(body('email').isEmail().withMessage('Неверный формат адреса электронной почты')); // кладём в массив условие для адреса почты
//   validations.push(body('password').isLength({ min: minPasswordLength }).withMessage(`Длинна пароля должна быть не менее ${minPasswordLength} символов`));

// const schema = {
//   email: {
//     isEmail: true,
//     errorMessage: 'Неверный формат адреса электронной почты',
//     in: ['body', 'query'],
//   },
//   password: {
//     isLength: {
//       options: { min: 6 },
//       errorMessage: `Длинна пароля должна быть не менее ${'6'} символов`,
//       in: ['body', 'query'],
//     },
//   },
// };

// const validate = () => [
//   checkSchema(schema),
//   (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(422).json({ errors: errors.mapped() });
//     }
//     return next();
//   },
// ];

// const errors = validationResult(req);
// if (errors.isEmpty()) next();
// return res.status(400).json({ errors: errors.array() });

// await Promise.all(validations.map(async (validation) => {
//   const result = await validation.run(req);
// }));
// const errors = validationResult(req);
// if (errors.isEmpty()) next();
// return res.status(400).json({ errors: errors.array() });

module.exports = validate;
