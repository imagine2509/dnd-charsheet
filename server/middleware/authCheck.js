require('dotenv').config()
const jwt = require('jsonwebtoken')

const handleUnauthorized = (res, message) => {
  return res.status(401).send({ message })
}

const handleJwtError = (res, e) => {
  switch (e.name) {
    case 'TokenExpiredError':
      return res.status(403).json({ message: 'Access token expired', error: e })
    case 'JsonWebTokenError':
      return res.status(401).json({ message: 'Invalid access token', error: e })
    default:
      return res.status(401).json({ message: 'Unauthorized access', error: e })
  }
}

module.exports = function (req, res, next) {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return handleUnauthorized(res, 'Authorization header not found')
    }
    const token = authHeader.split(' ')[1]
    if (!token) {
      return handleUnauthorized(
        res,
        'Access token not found in authorization header'
      )
    }
    const decoded = jwt.verify(token, process.env.JWT_ACCESS)
    if (!decoded) {
      return handleUnauthorized(res, 'Invalid access token')
    }
    req.user = decoded
    next()
  } catch (e) {
    return handleJwtError(res, e)
  }
}
