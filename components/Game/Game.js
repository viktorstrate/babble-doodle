import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import GameLobby from './GameLobby/GameLobby'

export default function Game() {
  const router = useRouter()

  const [socket, setSocket] = useState(null)
  const socketObj = { socket, setSocket }

  const [socketConnected, setSocketConnected] = useState(false)
  const [connectedPlayers, setConnectedPlayers] = useState([])

  const { game_id } = router.query

  useEffect(() => {
    if (game_id == null) return

    console.log('Connecting to', `/${game_id}`)
    const s = window.io(`/${game_id}`)

    s.on('connect', () => {
      console.log('connected')
      setSocketConnected(true)
    })

    s.on('player-details', players => {
      console.log('connected players:', players)
      setConnectedPlayers(players)
    })

    setSocket(s)

    return () => {
      s.close()
    }
  }, [router])

  if (!socketConnected) {
    return <h1>Connecting to room</h1>
  }

  return (
    <Layout>
      <h1>Babble Doodle Game</h1>
      <p>Welcome to game: {game_id}</p>
      <GameLobby socket={socket} connectedPlayers={connectedPlayers} />
    </Layout>
  )
}
