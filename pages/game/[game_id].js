import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import DrawingCanvas, {
  initialState as initialImageState,
} from '../../components/DrawingCanvas/DrawingCanvas'

const joinGame = (socket, image) => {
  socket.emit('join-game', { image })
}

export default function Game() {
  const router = useRouter()
  const [socket, setSocket] = useState(null)
  const [socketConnected, setSocketConnected] = useState(false)
  const [imageState, setImageState] = useState(initialImageState)
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
      <h2>Draw your character</h2>
      <DrawingCanvas
        width="200"
        height="200"
        setImageState={setImageState}
        imageState={imageState}
      />
      <br />
      <button
        disabled={socket == null || imageState.image.lines.length == 0}
        onClick={() => joinGame(socket, imageState.image)}
      >
        Join game
      </button>
      <div>
        <h2>Connected players</h2>
        {connectedPlayers.map(player => (
          <div key={player.id}>
            <p>Player: {player.id}</p>
            <DrawingCanvas
              width="150"
              height="150"
              imageState={{ image: player.image }}
            />
          </div>
        ))}
      </div>
    </Layout>
  )
}
