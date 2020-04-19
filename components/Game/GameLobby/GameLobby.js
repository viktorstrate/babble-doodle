import JoinGame from './JoinGame'
import ConnectedPlayers from './ConnectedPlayers'
import { localPlayer } from '../helpers'

const onStartGame = socket => () => {
  socket.emit('start-game')
}

export default function GameLobby({ socket, gameStateObj }) {
  const { gameState } = gameStateObj

  let joinGame = null
  if (localPlayer(socket, gameState) == null) {
    joinGame = <JoinGame socket={socket} gameStateObj={gameStateObj} />
  }

  const startDisabled = joinGame != null || gameState.players.length < 3

  return (
    <div>
      {joinGame}
      <ConnectedPlayers players={gameState.players} />
      <div>
        <button disabled={startDisabled} onClick={onStartGame(socket)}>
          Start the game
        </button>
      </div>
    </div>
  )
}
