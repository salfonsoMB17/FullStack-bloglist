const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')

const api = supertest(app)

test('user without username is not created', async () => {
    const newUser = {
        name: 'Test User',
        password: 'secret'
    }

    await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('user without password is not created', async () => {
    const newUser = {
        username: 'saa',
        name: 'Sergio Alfonso'
    }

    await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('user with username shorter than 3 characters is not created', async () => {
    const newUser = {
        username: 'sa',
        name: 'Test User',
        password: 'secret'
    }

    await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('user with password shorter than 3 characters is not created', async () => {
    const newUser = {
        username: 'saa',
        name: 'Test User',
        password: 'se'
    }

    await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('user with duplicate username is not created', async () => {
    const newUser = {
        username: 'testuser',
        name: 'Test User',
        password: 'secret'
    }

    await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

after(async () => {
  await mongoose.connection.close()
})
