const singleGame = require('./singleGame')
const { makeid } = require('./utils')

const setupGameSocket = (io, game) => {
  singleGame.setupGame(io, game)
}

const newGame = () => {
  const game = {
    id: makeid(),
  }

  return game
}

module.exports = {
  setupGameSocket,
  newGame,
}
