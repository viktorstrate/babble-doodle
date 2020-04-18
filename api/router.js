const express = require('express')
const game = require('./game')

function makeApiRouter(io) {
  game.setupSocket(io)

  const router = express.Router()

  router.post('/new-game', (req, res) => {
    const game = game.newGame()
    game.setupGameSocket(io, game)

    res.send({ ok: true, game })
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
