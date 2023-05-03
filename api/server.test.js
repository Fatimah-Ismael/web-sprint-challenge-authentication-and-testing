// Write your tests here
const db = require('../data/dbConfig')
const Users = require('./users/users-model')

beforeAll(async()=>{
  await db.migrate.rollback()
  await db.migrate.latest()
})

beforeEach(async()=>{
  await db.seed.run()
})
test('environment is testing', ()=>{
  expect(process.env.NODE_ENV).toBe('testing')
})