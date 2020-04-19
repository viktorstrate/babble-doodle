const singleGame = require('./singleGame')

const makeid = () => {
  let result = ''
  let alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < 16; i++)
    result += alphabet.charAt(Math.floor(Math.random() * alphabet.length))
  return result
}

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
