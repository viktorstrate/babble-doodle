const express = require('express')
const game = require('./game')

function makeApiRouter(io) {
  game.setupSocket(io)

  const router = express.Router()

  router.get('/new-game', (req, res) => {
    res.send({ success: true })
  })

  router.all('*', (req, res) => {
    res.send({
      success: false,
      message: 'api endpoint does not exist',
    })
  })

  return router
}

module.exports = makeApiRouter
