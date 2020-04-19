const startGame = (io, game) => {
  console.log('Setting up socket room', `/${game.id}`)

  const room = io.of(`/${game.id}`)

  let players = []

  room.on('connection', async client => {
    console.log('a user connected to game', game.id)

    emitPlayerDetails(client, players)

    const user = await userJoin(client)
    players.push({
      user: {
        ...user,
        id: client.id,
      },
      client,
    })
    console.log(`a user joined the game: ${players.length} players connected`)

    emitPlayerDetails(room, players)

    client.on('disconnect', () => {
      players = players.filter(x => x.client.id != client.id)
      console.log(
        `client disconnected from room: ${players.length} players connected`
      )

      emitPlayerDetails(room, players)
    })
  })
}

const userJoin = client =>
  new Promise(resolve => {
    client.on('join-game', user => {
      resolve(user)
    })
  })

const emitPlayerDetails = (socket, players) => {
  socket.emit(
    'player-details',
    players.map(x => x.user)
  )
}

module.exports = {
  startGame,
}
