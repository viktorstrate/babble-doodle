import GameDrawing from './Drawing/GameDrawing'
import GameVoting from './Voting/GameVoting'

export default function GameRunning({ socket, gameStateObj }) {
  const { gameState } = gameStateObj

  let roundStateEl = null
  switch (gameState.round && gameState.round.state) {
    case 'drawing':
      roundStateEl = <GameDrawing socket={socket} gameStateObj={gameStateObj} />
      break
    case 'voting':
      roundStateEl = <GameVoting socket={socket} gameStateObj={gameStateObj} />
      break
    default:
      roundStateEl = <div>Invalid game round state...</div>
  }

  return roundStateEl
}
