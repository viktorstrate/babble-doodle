import React from 'react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import GameLobby from './GameLobby/GameLobby'
import gameEvents from './gameEvents'
import runningGameEvents from './GameRunning/runningGameEvents'
import GameRunning from './GameRunning/GameRunning'
import Logo from '../Logo/Logo'

export default function Game() {
  const router = useRouter()

  const [socket, setSocket] = useState(null)
  const [socketConnected, setSocketConnected] = useState(false)

  const { game_id } = router.query
  const [gameState, setGameState] = useState({
    players: [],
    gameId: null,
  })
  const gameStateObj = { gameState, setGameState }

  console.log('gameState', gameState)

  useEffect(() => {
    if (game_id == null) return

    if (game_id != gameState.gameId) {
      setGameState({
        ...gameState,
        gameId: game_id,
      })
    }

    console.log('Connecting to', `/${game_id}`)
    const s = window.io(`/${game_id}`)

    console.log(s)

    gameEvents({
      socket: s,
      setSocketConnected,
      setGameState,
    })

    runningGameEvents(s, gameStateObj)

    setSocket(s)

    return () => {
      s.close()
    }
  }, [router])

  if (!socketConnected) {
    return <h1>Connecting to room</h1>
  }

  let stateElm = null
  switch (gameState.state) {
    case 'lobby':
      stateElm = <GameLobby socket={socket} gameStateObj={gameStateObj} />
      break
    case 'running':
      stateElm = <GameRunning socket={socket} gameStateObj={gameStateObj} />
      break
    default:
      stateElm = <p>Game is in an unknown state...</p>
  }

  return (
    <Layout>
      <Logo centered />
      {stateElm}
    </Layout>
  )
}
