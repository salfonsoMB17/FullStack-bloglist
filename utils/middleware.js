const jwt = require('jsonwebtoken')
const User = require('../models/users')

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.substring(7)
  }
  next()
}

const userExtractor  = async (request, response, next) => {
  const authorization = request.token
  if (authorization) {
    const decodedToken = jwt.verify(authorization, process.env.SECRET)
    request.user = await User.findById(decodedToken.id)
  }
  next()

}

module.exports = { tokenExtractor, userExtractor }