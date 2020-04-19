const express = require('express')
const game = require('./game')

function makeApiRouter(io) {
  game.setupSocket(io)

  const router = express.Router()

  router.post('/new-game', (req, res) => {
    const room = game.newGame()
    game.setupGameSocket(io, room)

    res.send({ ok: true, game: room })
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
