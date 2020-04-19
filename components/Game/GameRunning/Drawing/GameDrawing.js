import { localPlayerRole } from '../../helpers'
import GameRolePainter from './GameRolePainter'
import GameRoleConveyor from './GameRoleConveyor'
import GameRoleParticipant from './GameRoleParticipant'

export default function GameDrawing({ socket, gameStateObj }) {
  const { gameState } = gameStateObj

  let roleEl = null
  switch (localPlayerRole(socket, gameState)) {
    case 'painter':
      roleEl = <GameRolePainter socket={socket} gameStateObj={gameStateObj} />
      break
    case 'conveyor':
      roleEl = <GameRoleConveyor socket={socket} gameStateObj={gameStateObj} />
      break
    case 'participant':
      roleEl = (
        <GameRoleParticipant socket={socket} gameStateObj={gameStateObj} />
      )
      break
    default:
      roleEl = <div>Your role has not been assigned yet</div>
  }

  return roleEl
}
