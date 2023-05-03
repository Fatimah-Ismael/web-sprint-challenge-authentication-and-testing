// Write your tests here
const db = require('../data/dbConfig')
const request = require('supertest')
const server = require('./server')
const User= require('./users/users-model')

const user = {username: 'Muhammad', password: '1234'}

beforeAll(async()=>{
  await db.migrate.rollback()
  await db.migrate.latest()
})

test('environment is testing', ()=>{
  expect(process.env.NODE_ENV).toBe('testing')
})

describe('[POST] /api/auth/register', ()=>{
  test('returns a 200 OK status code', async () => {
    const newUser = {username: 'Tiff', password: '1234'}
    const res = await request(server)
      .post('/api/auth/register')
      .send(newUser)
      expect(res.status).toEqual(200)
  })
  test('returns username', async()=>{
    let result = await User.getById(1)
    expect(result).toMatchObject({ username: 'Tiff'})
  })
})

describe('[POST] /api/auth/login', ()=>{
  test("returns 'welcome, ${username}' if successful login", async ()=>{
    const newUser = {username: 'Muhammad', password:'1234'}
    await request(server)
    .post('/api/auth/register')
    .send(newUser)
    const res = await request(server)
    .post('/api/auth/login')
    .send(newUser)
    expect(res.body.message).toEqual('Welcome Muhammad')
  })
  test('wrong username input', async()=>{
    const newUser = {username:'Frodo', password:'1234'}
    await request(server)
    .post('/api/auth/login')
    .send(newUser)
    const res = await request(server)
    .post('/api/auth/login')
    .send({username:'Frod', password:'1234'})
    expect(res.body.message).toEqual('invalid credentials')
  })
})
describe('[GET] /api/jokes', ()=>{
  test('returns 401 status code', async ()=>{
    const res = await request(server)
    .get('/api/jokes')
    expect(res.status).toBe(401)
  })
  test("returns 'token required' message if token missing", async()=>{
    const res = await request(server)
    .get('/api/jokes')
    expect(res.body.message).toBe('Token required')
  })
})