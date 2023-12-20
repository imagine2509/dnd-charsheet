require('dotenv').config();
const express = require('express');
const serverConfig = require('./config/serverConfig');

// роутеры
const loginRouter = require('./routes/api/users/users.login.routes');
const logoutRouter = require('./routes/api/users/users.logout.routes');
const registerRouter = require('./routes/api/users/users.register.routes');
const refreshRouter = require('./routes/api/tokens/users.tokenRefresh.routes');
const editUserRouter = require('./routes/api/users/users.edit.routes');

// инициализация приложения 'app'
const app = express();

// условное формирование порта
const PORT = process.env.PORT ?? 3002;

// конфигурация приложения
serverConfig(app);

// маршрутизация приложения
app.use('/api/users/', loginRouter);
app.use('/api/users/', logoutRouter);
app.use('/api/users/', registerRouter);
app.use('/api/tokens/', refreshRouter);
app.use('/api/users/', editUserRouter);

// прослушивание порта приложения
app.listen(PORT, () => {
  process.stdout.write(`*** Server started at ${PORT} port ***`);
});
