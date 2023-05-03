const User = require('../users/users-model')
const bcrypt = require('bcryptjs')
/* 
function restricted(req, res, next){
    if(req.session.user){
        next()
    }else{
       next({ status:401, message: 'You shall not pass'})
    }
}
*/
//check if username unique
async function checkUnique(req, res, next){

        const {username} = req.body
        const userExist = await User.findBy({username})
            if(!userExist){
                next()
            } else{
                next({ status: 401, message: 'Username taken'})
            }
    

} 
/*
function checkPasswordLength(req, res, next){
    if(!req.body.password || req.body.password.length<3){
        next({ status: 422, message: 'Password needs to be longer than 3 characters'})
    }else{
        next()
    }
}
*/
//check if credential exitsts
function checkCred(req, res, next){
    if(req.body.username && req.body.password){
        next()
    } else{
        next({ status: 401, message: 'username and password required'})
    }
}
async function checkValidInfo(req, res, next){

        const user = await User.findBy({ username: req.body.username})
            if(user && bcrypt.compareSync(req.body.password, user.password)){
                req.user = user[0]
                next()
            }else{
                next({status: 401, message: 'invalid credentials'})
            }
  
}
module.exports= {
   
    checkUnique, 
    //checkPasswordLength, 
    checkValidInfo,
    checkCred
}