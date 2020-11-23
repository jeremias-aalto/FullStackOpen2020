const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { url: 1, title: 1, author: 1, id: 1 })
  response.json(users.map(user => user.toJSON()))
})

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body
    if (body.password === undefined) {
      return response.status(400).json({ error: 'Password` is required.' })
    } else if (body.password.length < 3) {
      return response.status(400).json({ error: 'Password must be at least 3 characters long.' })
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    const user = new User({
      username: body.username,
      name: body.name,
      password: passwordHash
    })
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch (error) {
    response.status(400).json({ error: error.message })
  }
})

module.exports = usersRouter