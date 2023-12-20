/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const express = require('express');
const { validationResult } = require('express-validator');
const { body } = require('express-validator');
// can be reused by many routes

// sequential processing, stops running validations chain if the previous one fails.
const validate = () => async (req, res, next) => {
  const validations = [];
  const minPasswordLength = 6;
  validations.push(body('email').isEmail().withMessage('Неверный формат адреса электронной почты'));
  validations.push(body('password').isLength({ min: minPasswordLength }).withMessage(`Длинна пароля должна быть не менее ${minPasswordLength} символов`));

  console.log(req.body);
  for (const validation of validations) {
    const result = await validation.run(req);
    if (result.errors.length) break;
  }

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  res.status(400).json({ errors: errors.array() });
  return false;
};

module.exports = validate;
