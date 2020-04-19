const current_games = []

const setupSocket = io => {
  // io.on('connection', socket => {
  //   console.log('user connected')
  //   socket.on('disconnect', () => {
  //     console.log('user disconnected')
  //   })
  // })
}

const makeid = () => {
  let result = ''
  let alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < 16; i++)
    result += alphabet.charAt(Math.floor(Math.random() * alphabet.length))
  return result
}

const setupGameSocket = (io, game) => {
  console.log('Setting up socket room', `/${game.id}`)
  const room = io.of(`/${game.id}`)
  room.on('connection', client => {
    console.log('a user joined game', game.id)
    client.on('disconnect', () => console.log('client disconnected from room'))
  })
}

const newGame = () => {
  const game = {
    id: makeid(),
  }

  return game
}

module.exports = {
  setupSocket,
  setupGameSocket,
  newGame,
}
