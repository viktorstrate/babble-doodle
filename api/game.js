const lobbies = []

const setupSocket = io => {
  io.on('connection', socket => {
    console.log('user connected')

    socket.on('disconnect', () => {
      console.log('user disconnected')
    })
  })
}

const makeid = () => {
  let result = ''
  let alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < 16; i++)
    result += alphabet.charAt(Math.floor(Math.random() * alphabet.length))
  return result
}

const makeLobby = () => {
  const newLobby = {
    id: makeid(),
  }

  return newLobby
}

module.exports = {
  setupSocket,
  makeLobby,
}
