const express = require('express');

const validate = () => async (req, res, next) => {
  const { password, email } = req.body;
  console.log(req);
  const minPasswordLen = 6;
  const PasswordRegEx = new RegExp(`^(?=.*d)(?=.*[!-/:-@[-\`{-~])(?=.*[a-z])(?=.*[A-Z]).{${minPasswordLen}}$/`, 'g');
  const numberRegEx = /\d/;
  const specialCharRegEx = /[!-/:-@[-`{-~]/;

  class Validator {
    constructor(params = {}) {
      this.message = params.message ?? 'Ошибка валидации';
      this.key = params.key ?? '';
      this.where = params.where ?? 'request body';
      this.value = params.value;
      this.name = params.name;
      this.errors = [];
      this.numberRegEx = /\d/;
      this.specialCharRegEx = /[!-/:-@[-`{-~]/;
    }

    sendErrors(httpCode) {
      res.status(httpCode).json({ errors: this.errors });
    }

    storeError(error) {
      this.errors.push(error);
    }

    checkForEmty() {
      if (!this.value) {
        this.storeError({
          message: `${this.name} имеет пустое значение`, key: this.key, value: this.value, where: this.where,
        });
        return false;
      }
      return true;
    }

    checkForMinLen(minLen) {
      if (this.value.length < minLen) {
        this.storeError({
          message: `${this.name} должен быть равен или длинее ${minLen} символов`, key: this.key, value: this.value, where: this.where,
        });
        return false;
      }
      return true;
    }

    checkForNumber() {
      if (!this.numberRegEx.test(this.value)) {
        this.storeError({
          message: `${this.name} должен содержать хотя бы одну цифру`, key: this.key, value: this.value, where: this.where,
        });
        return false;
      }
      return true;
    }

    checkForSpecialChar() {
      if (!this.specialCharRegEx.test(this.value)) {
        this.storeError({
          message: `${this.name} должен содержать хотя бы один специальный символ`, key: this.key, value: this.value, where: this.where,
        });
        return false;
      }
      return true;
    }
  }

  const passwordValidator = new Validator({ value: password, name: 'Пароль', key: 'password' });
  if (!passwordValidator.checkForEmty()) {
    passwordValidator.sendErrors(404);
    return;
  }
  if (!passwordValidator.checkForMinLen(minPasswordLen)) {
    passwordValidator.sendErrors(403);
  }
  passwordValidator.checkForNumber();
  passwordValidator.checkForSpecialChar();
  if (passwordValidator.errors.length) passwordValidator.sendErrors(403);
/*   if (!email) {
    const emptyEmailError = new ValidationErrors({ message: 'Пустое значение адреса электронной почты', key: 'email', value: email });
    emptyEmailError.sendErrors(404);
    return;
  }
  if (!password) {
    const emptyPasswordError = new ValidationErrors({ message: 'Пустое значение пароля', key: 'password', value: password });
    emptyPasswordError.sendErrors(404);
    return;
  }
  if (password.length < minPasswordLen) {
    const otherPasswordErrors = new ValidationErrors({ message: `Длинна пароля должна быть ${minPasswordLen} или более символов`, key: 'password', value: password });
  }
  if (!numberRegEx.test(password)) {
    const minPasswordLenError = new ValidationErrors({ message: 'Пароль должен содержать хотя бы одну цифру', key: 'password', value: password });
    minPasswordLenError.sendErrors(403);
  } */
};

/*   if (errors.length) {
    return res.status(400).json({ errors });
  } */

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
