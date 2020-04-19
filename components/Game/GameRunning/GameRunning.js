import { useEffect } from 'react'
import runningGameEvents from './runningGameEvents'
import { localPlayerRole } from '../helpers'
import GameRolePainter from './GameRolePainter'
import GameRoleConveyor from './GameRoleConveyor'
import GameRoleParticipant from './GameRoleParticipant'

export default function GameRunning({ socket, gameStateObj }) {
  const { gameState } = gameStateObj

  useEffect(() => {
    runningGameEvents(socket, gameStateObj)
  }, [])

  let roleEl = null
  switch (localPlayerRole(socket, gameState)) {
    case 'painter':
      roleEl = <GameRolePainter />
      break
    case 'conveyor':
      roleEl = <GameRoleConveyor />
      break
    case 'participant':
      roleEl = <GameRoleParticipant />
      break
    default:
      roleEl = <div>Your role has not been assigned yet</div>
  }

  return (
    <div>
      <h2>Game started</h2>
      {roleEl}
    </div>
  )
}
