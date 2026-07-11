const usersRouter = require('express').Router()
const User = require('../models/users')
const bcrypt = require('bcryptjs')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  try {
    const { username, name, password } = request.body
    if (!username || username.length < 3) {
      return response.status(400).json({ error: 'username must be at least 3 characters long' })
    }
    if (!password || password.length < 3) {
      return response.status(400).json({ error: 'password must be at least 3 characters long' })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const user = new User({ username, name, passwordHash })
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch (error) {
    response.status(400).json({ error: error.message })
  }
})

usersRouter.put('/:id', async (request, response) => {
  try {   
    const updatedUser = await User.findByIdAndUpdate(request.params.id, request.body, { returnDocument: 'after' })
    response.status(200).json(updatedUser)
  } catch (error) {
    response.status(400).json({ error: error.message })
  }
})

usersRouter.delete('/:id', async (request, response) => {
  try {   
    await User.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error) {
    response.status(400).json({ error: error.message })
  }
})

module.exports = usersRouter