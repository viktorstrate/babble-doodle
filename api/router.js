const express = require('express')
const game = require('./game')

function makeApiRouter(io) {
  game.setupSocket(io)

  const router = express.Router()

  router.post('/new-game', (req, res) => {
    const { socketSession } = req.body
    console.log(req.body)

    if (socketSession == null) {
      res.send({ ok: false, message: 'no socket session provided' })
      return
    }

    res.send({ ok: true, lobby: game.makeLobby() })
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
