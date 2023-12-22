const express = require('express');
const { validationResult, body, checkSchema } = require('express-validator');

// const validate = () => async (req, res, next) => {
//   const validations = []; // массив уловий для проверок
//   const minPasswordLength = 6; // минимальная длинна пароля
//   // провер очки:
//   validations.push(body('email').isEmail().withMessage('Неверный формат адреса электронной почты')); // кладём в массив условие для адреса почты
//   validations.push(body('password').isLength({ min: minPasswordLength }).withMessage(`Длинна пароля должна быть не менее ${minPasswordLength} символов`));

const schema = {
  email: {
    isEmail: true,
    errorMessage: 'Неверный формат адреса электронной почты',
    in: ['body', 'query'],
  },
  password: {
    isLength: {
      options: { min: 6 },
      errorMessage: `Длинна пароля должна быть не менее ${'6'} символов`,
      in: ['body', 'query'],
    },
  },
};

const validate = () => [
  checkSchema(schema),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }
    return next();
  },
];

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
