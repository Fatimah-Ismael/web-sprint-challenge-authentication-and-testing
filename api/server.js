const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session')
const Store = require('connect-session-knex')(session)
const knex = require('../data/dbConfig')

const restrict = require('./middleware/restricted.js');

const authRouter = require('./auth/auth-router.js');
const jokesRouter = require('./jokes/jokes-router.js');

const server = express();

server.use(session({
    name:'chocolatechip',
    secret: 'keep it secret',
    cookie: {
      maxAge: 1000 * 60 * 60,
      secure: false,
      httpOnly: false,
     // sameSite: 'none'
    },
    resave:false,
    saveUninitialized: false,
    Store: ({
      knex,
      createTable: true,
      clearInterval: 1000*60*10,
      tableName: 'session',
      sidfieldname: 'sid',
    })
}))

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/jokes', restrict, jokesRouter); // only logged-in users should have access!

server.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
