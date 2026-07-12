const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/users')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  try {
    const token = request.token    
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken || !decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }

    const blog = new Blog(request.body)
    const user = await User.findById(decodedToken.id)
    blog.user = user
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return response.status(401).json({ error: 'token invalid or missing' })
    }
    response.status(400).json({ error: error.message })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  try {   
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { returnDocument: 'after' })
    response.status(200).json(updatedBlog)
  } catch (error) {
    response.status(400).json({ error: error.message })
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken || !decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }

    const blog = await Blog.findById(request.params.id)
    if (blog.user.toString() !== decodedToken.id.toString()) {
      return response.status(401).json({ error: 'unauthorized: only the creator can delete this blog' })
    }

    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return response.status(401).json({ error: 'token invalid or missing' })
    }
    response.status(400).json({ error: error.message })
  }
})

module.exports = blogsRouter