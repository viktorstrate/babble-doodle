const startGame = (io, game) => {
  console.log('Setting up socket room', `/${game.id}`)

  const room = io.of(`/${game.id}`)

  room.on('connection', async client => {
    console.log('a user connected to game', game.id)

    const user = await userJoin(client)
    console.log('a user joined the game', game.id, JSON.stringify(user))

    client.on('disconnect', () => console.log('client disconnected from room'))
  })
}

const userJoin = client =>
  new Promise(resolve => {
    client.on('join-game', user => {
      resolve(user)
    })
  })

module.exports = {
  startGame,
}
