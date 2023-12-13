require('dotenv').config()
const express = require('express')
const serverConfig = require('./config/serverConfig')

// роутеры
const loginRouter = require('./routes/api/users/user.login.routes')
const logoutRouter = require('./routes/api/users/user.logout.routes')
const registerRouter = require('./routes/api/users/user.register.routes')
const refreshRouter = require('./routes/api/tokens/user.tokenRefresh.routes')
const editUserRouter = require('./routes/api/users/user.edit.routes')

// инициализация приложения 'app'
const app = express()

// условное формирование порта
const PORT = process.env.PORT ?? 3000

// конфигурация приложения
serverConfig(app)

// маршрутизация приложения
app.use('/api/user/', loginRouter)
app.use('/api/user/', logoutRouter)
app.use('/api/user/', registerRouter)
app.use('/api/token/', refreshRouter)
app.use('/api/user/', editUserRouter)

// прослушивание порта приложения
app.listen(PORT, () => {
  console.log(`*** Server started at ${PORT} port ***`)
})
