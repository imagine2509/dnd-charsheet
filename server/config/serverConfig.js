const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// главная конфигурация приложения
const serverConfig = (app) => {
  // использование middleware
  const corsOptions = { origin: true, credentials: true };
  app.use(cors(corsOptions));
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static('public'));
  app.use(cookieParser());
};

module.exports = serverConfig;
