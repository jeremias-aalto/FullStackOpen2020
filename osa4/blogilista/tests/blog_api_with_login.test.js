const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

let token = 'bearer '

describe('creating a new user', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })

  test('valid user can be added', async () => {
    const usersAtStart = await usersInDb()
    const newUser = {
      username: 'pekka',
      password: 'qwerty'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length+1)
    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test('user has to have a username', async () => {
    const usersAtStart = await usersInDb()
    const newUser = {
      password: 'qwerty'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('user has to have a username that is unique', async () => {
    const newUser = {
      username: 'pekka',
      password: 'qwerty'
    }
    await api
      .post('/api/users')
      .send(newUser)
    const usersAtStart = await usersInDb()
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('user has to have a password', async () => {
    const usersAtStart = await usersInDb()
    const newUser = {
      username: 'pekka'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('user has to have a password of at least 3 characters', async () => {
    const usersAtStart = await usersInDb()
    const newUser = {
      username: 'pekka',
      password: 'qw'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

describe('getting authorization', () => {
  test('adding a user', async () => {
    const newUser = {
      username: 'pekka',
      password: 'qwerty'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
  })

  test('the user can get authorization', async () => {
    const tokenRequest = await api
      .post('/api/login')
      .send({ username: 'pekka', password: 'qwerty' })
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(tokenRequest.body.token).toBeDefined
    if (tokenRequest.body.token) { token += tokenRequest.body.token }
  })
})

describe('the user can create blogs', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
  })

  test('a blog can be created', async () => {
    const blogsAtStart = await blogsInDb()
    const title = 'Pekan blogi'
    await api
      .post('/api/blogs')
      .send({ title: title, author: 'Pekka', url: 'www.pekanblogi.fi' })
      .set('authorization', token)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length+1)
    const titles = blogsAtEnd.map(res => res.title)
    expect(titles).toContain(title)
  })
})

afterAll(() => {
  mongoose.connection.close()
})