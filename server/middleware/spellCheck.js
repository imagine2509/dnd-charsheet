/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const express = require('express');
const { validationResult } = require('express-validator');
// can be reused by many routes

// sequential processing, stops running validations chain if the previous one fails.
const validate = (validations) => async (req, res, next) => {
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
