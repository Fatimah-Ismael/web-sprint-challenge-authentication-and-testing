const db = require('../../data/dbConfig')
/*
function find(){
    return db('users').select('user_id', 'username')
}
*/
function findBy(filter){
    return db('users').where(filter).first()
}


function findById(user_id){
    return db('users')
    .where('user_id', user_id)
    .first()    
}
async function add(newUser){
    const id=  await db('users').insert(newUser)
    return findById(id)
}

module.exports={
     add, findById, findBy
}