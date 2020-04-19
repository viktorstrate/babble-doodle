import JoinGame from './JoinGame'
import ConnectedPlayers from './ConnectedPlayers'

export default function GameLobby({ socket, connectedPlayers }) {
  return (
    <div>
      <JoinGame socket={socket} />
      <ConnectedPlayers players={connectedPlayers} />
    </div>
  )
}
