const lobbies = []

const setupSocket = io => {
  io.on('connection', socket => {
    console.log('user connected')

    socket.on('disconnect', () => {
      console.log('user disconnected')
    })
  })
}

const makeLobby = () => {}

module.exports = {
  setupSocket,
  makeLobby,
}
