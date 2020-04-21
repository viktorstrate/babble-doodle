import React from 'react'
import JoinGame from './JoinGame'
import ConnectedPlayers from './ConnectedPlayers'
import { localPlayer } from '../helpers'
import Button from '../../Button'

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

  let morePlayersText = null
  if (startDisabled) {
    morePlayersText = (
      <p>
        <i>
          {3 - gameState.players.length} more players are needed to join the
          game.
        </i>
      </p>
    )
  }

  let gameInProgressText = null
  if (gameState.state != 'lobby') {
    gameInProgressText =
      'The game is currently in progress, join to participate in the next round'
  }

  return (
    <div>
      {joinGame}
      {gameInProgressText}
      <ConnectedPlayers socketId={socket.id} players={gameState.players} />
      <div>
        <Button disabled={startDisabled} onClick={onStartGame(socket)}>
          Start the game
        </Button>
        {morePlayersText}
      </div>
    </div>
  )
}
