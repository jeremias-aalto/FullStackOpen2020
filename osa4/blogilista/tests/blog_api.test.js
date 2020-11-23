const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    'title': 'HurjaBlogi',
    'author': 'Jalmari Hurja',
    'url': 'www.hurjablogi.com',
    'likes': '30'
  },
  {
    'title': 'HauskaBlogi',
    'author': 'Einari Hauska',
    'url': 'www.hauskablogi.com',
    'likes': '20'
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

describe('getting blogs', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
  })

  test('all blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('returned blogs have id instead of _id', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => {
      expect(blog.id).toBeDefined()
    })
  })
})

describe('creating blogs', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'JännäBlogi',
      author: 'Kalmari Jännä',
      url: 'www.jännäblogi.com',
      likes: 40,
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')
    const titles = response.body.map(res => res.title)
    expect(response.body).toHaveLength(initialBlogs.length+1)
    expect(titles).toContain(newBlog.title)
  })

  test('if no likes are set, they will default to 0', async () => {
    const newBlog = {
      title: 'JännäBlogi',
      author: 'Kalmari Jännä',
      url: 'www.jännäblogi.com'
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')
    const likes = response.body.map(res => res.likes)
    expect(likes[likes.length-1]).toBe(0)
  })

  test('if no title is set, app responds with 400 Bad Request', async () => {
    const newBlog = {
      author: 'Kalmari Jännä',
      url: 'www.jännäblogi.com',
      likes: 2
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('if no url is set, app responds with 400 Bad Request', async () => {
    const newBlog = {
      title: 'JännäBlogi',
      author: 'Kalmari Jännä',
      likes: 2
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

describe('deleting blogs', () => {
  test('a blog can be deleted', async () => {
    const blogsAtStart = await blogsInDb()
    const blogToDelete = blogsAtStart[0]
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length-1)
    const titles = blogsAtEnd.map(res => res.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('getting users', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({ username: 'root', password: 'sekret' })
    await user.save()
  })

  test('all users successfully returned as json', async () => {
    const usersAtStart = await usersInDb()
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

describe('creating users', () => {
  test('new user can be added', async () => {
    const usersAtStart = await usersInDb()
    const newUser = {
      username: 'jhurja',
      name: 'Jalmari Hurja',
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

  test('new user has to have a username', async () => {
    const usersAtStart = await usersInDb()
    const newUser = {
      name: 'Klooni Root',
      password: 'qwerty'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('username has to be unique', async () => {
    const usersAtStart = await usersInDb()
    const newUser = {
      username: 'root',
      name: 'Klooni Root',
      password: 'qwerty'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('new user has to have a password', async () => {
    const usersAtStart = await usersInDb()
    const newUser = {
      username: 'ehauska',
      name: 'Einari Hauska'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('new user has to have a password at least 3 characters long', async () => {
    const usersAtStart = await usersInDb()
    const newUser = {
      username: 'ehauska',
      name: 'Einari Hauska',
      password: '1'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})