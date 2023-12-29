const express = require('express');

const validate = () => async (req, res, next) => {
  const { password, email } = req.body;
  const minLen = 6;

  function CreateValidator(initParams) {
    class Validator {
      constructor(params = { ...initParams }) {
        this.lang = params.lang ? params.lang.toLowerCase() : 'ru';
        this.key = params.key ?? '';
        this.where = params.where ?? 'request body';
        this.value = params.value;
        this.name = params.name;
        this.errors = [];
        this.messages = {};
        this.messages.ru = {
          default: params.message ?? 'Ошибка валидации',
          empty: `${this.name} имеет пустое значение`,
          minLen: `${this.name} должен быть равен или длинее ${minLen} символов`,
          number: `${this.name} должен содержать хотя бы одну цифру`,
          specialChar: `${this.name} должен содержать хотя бы один специальный символ`,
          lowerCaseLetter: `${this.name} должен содержать хотя бы одну маленькую букву`,
          upperCaseLetter: `${this.name} должен содержать хотя бы одну большую букву`,
        };
        this.messages.en = {
          default: params.message ?? 'Validation error',
          empty: `${this.name} has empty value`,
          minLen: `${this.name} should be equal or longer than ${minLen} characters`,
          number: `${this.name} should contain at least one number`,
          specialChar: `${this.name} should contain at least one special character`,
          lowerCaseLetter: `${this.name} should contain at least one small letter`,
          upperCaseLetter: `${this.name} should contain at least one big letter`,
        };
        this.regEx = {
          number: /(?=.*d)/,
          specialChar: /(?=.*[!-/:-@[-`{-~])/,
          lowerCaseLetter: /(?=.*[a-z])/,
          upperCaseLetter: /(?=.*[A-Z])/,
        };
      }

      checkFor(param) {
        if (!this.regEx[param].test(this.value)) {
          this.storeError({
            message: this.messages[`${this.lang}.${this.param}`], key: this.key, value: this.value, where: this.where,
          });
          return false;
        }
        return true;
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
            message: this.messages[this.lang].empty, key: this.key, value: this.value, where: this.where,
          });
          return false;
        }
        return true;
      }

      checkForMinLen(len) {
        if (this.value.length < len) {
          this.storeError({
            message: this.messages[this.lang].minLen, key: this.key, value: this.value, where: this.where,
          });
          return false;
        }
        return true;
      }

      checkForNumber() {
        if (!this.regEx.number.test(this.value)) {
          this.storeError({
            message: this.messages[this.lang].number, key: this.key, value: this.value, where: this.where,
          });
          return false;
        }
        return true;
      }

      checkForSpecialChar() {
        if (!this.regEx.specialChar.test(this.value)) {
          this.storeError({
            message: this.messages[this.lang].specialChar, key: this.key, value: this.value, where: this.where,
          });
          return false;
        }
        return true;
      }

      checkForLowerCaseLetter() {
        if (!this.regEx.lowerCaseLetter.test(this.value)) {
          this.storeError({
            message: this.messages[this.lang].lowerCaseLetter, key: this.key, value: this.value, where: this.where,
          });
          return false;
        }
        return true;
      }

      checkForUpperCaseLetter() {
        if (!this.regEx.upperCaseLetter.test(this.value)) {
          this.storeError({
            message: this.messages[this.lang].upperCaseLetter, key: this.key, value: this.value, where: this.where,
          });
          return false;
        }
        return true;
      }
    }
    return new Validator(initParams);
  }

  const passwordValidator = CreateValidator({
    value: password, name: 'Пароль', key: 'password', lang: 'es',
  });
  if (!passwordValidator.checkForEmty()) {
    passwordValidator.sendErrors(404);
    return;
  }
  if (!passwordValidator.checkForMinLen(minLen)) {
    passwordValidator.sendErrors(403);
  }
  passwordValidator.checkForNumber();
  passwordValidator.checkForSpecialChar();
  if (passwordValidator.errors.length) passwordValidator.sendErrors(403);
};

module.exports = validate;
