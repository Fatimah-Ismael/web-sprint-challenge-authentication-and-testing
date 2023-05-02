const User = require('../users/users-model')

function restricted(req, res, next){
    if(req.session.user){
        next()
    }else{
        next({ status:401, message: 'You shall not pass'})
    }
}

async function checkUsernameFree(req, res, next){
    try{
        const users = await User.findBy({ username: req.body.username})
            if(!users.length){
                next()
            } else{
                next({ status: 422, message: 'Username taken'})
            }
    } catch(err){
        next(err)
    }

} 

function checkPasswordLength(req, res, next){
    if(!req.body.password || req.body.password.length<3){
        next({ status: 422, message: 'Password needs to be longer than 3 characters'})
    }else{
        next()
    }
}
function checkBody(req, res, next){
    if(req.body.username && req.body.password){
        next()
    } else{
        next({ status: 401, message: 'username and password required'})
    }
}
async function checkUsernameExists(req, res, next){
    try{
        const users = await User.findBy({ username: req.body.username})
            if(users.lenght){
                req.user = users[0]
                next()
            }else{
                next({status: 422, message: 'invalid credentials'})
            }
    }catch(err){
        next(err)
    }
}
module.exports= {
    restricted, 
    checkUsernameFree, 
    checkPasswordLength, 
    checkBody,
    checkUsernameExists
}