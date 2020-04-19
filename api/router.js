const express = require('express')
const gameManager = require('./game/gameManager')

function makeApiRouter(io) {
  const router = express.Router()

  router.post('/new-game', (req, res) => {
    const game = gameManager.newGame()
    gameManager.setupGameSocket(io, game)

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
