const db = require('../../data/dbConfig')

function find(){
    return db('users').select('user_id', 'username')
}

function findBy(filter){
    return db('users').where(filter).first()
}


function getById(id) {
    return db('users').where('id', id).first()
  }
  
  async function insert(newUser) {
    const userId = await db('users').insert(newUser)
    return getById(userId)
  }
  
  module.exports = {
    getById,
    insert,
    find, 
    findBy
  }