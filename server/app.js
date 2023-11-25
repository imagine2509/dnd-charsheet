// пакет для автоматической компиляции файлов (JSX > HTML)
require('@babel/register')

// использование данных из конфигурации файла .env
require('dotenv').config()

const express = require('express')
const cors = require('cors')
const serverConfig = require('./config/serverConfig')

// роутеры
const loginRouter = require('./routes/api/users/user.login.routes')
const logoutRouter = require('./routes/api/users/user.logout.routes')
const registerRouter = require('./routes/api/users/user.register.routes')
const refreshRouter = require('./routes/api/tokens/user.tokenRefresh.routes')
const validateAccessRouter = require('./routes/api/users/user.validateAccess.routes')
const editUserRouter = require('./routes/api/users/user.edit.routes')
const errorHandler = require('./middleware/errorHandler')

// инициализация приложения 'app'
const app = express()

// условное формирование порта
const PORT = process.env.PORT ?? 3000

// конфигурация приложения
serverConfig(app)
const corsOptions = {
  origin: true,
  credentials: true,
}
app.use(cors(corsOptions))

// маршрутизация приложения
app.use('/api/user/', loginRouter)
app.use('/api/user/', logoutRouter)
app.use('/api/user/', registerRouter)
app.use('/api/token/', refreshRouter)
app.use('/api/user/', validateAccessRouter)
app.use('/api/user/', editUserRouter)

// обработка ошибок из next(error)
app.use(errorHandler)

// прослушивание порта приложения
app.listen(PORT, () => {
  console.log(`*** Server started at ${PORT} port ***`)
})
