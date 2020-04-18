import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import { useEffect } from 'react'

const registerGame = socket => {
  socket.emit('join-game', {})
}

export default function Game() {
  const router = useRouter()
  const { game_id } = router.query

  useEffect(() => {
    const socket = window.io(`/${game_id}`)

    socket.on('connect', () => {
      console.log('connected')
    })

    registerGame(socket)
  }, [])

  return (
    <Layout>
      <h1>Babble Doodle Game</h1>
      <p>Welcome to game: {game_id}</p>
    </Layout>
  )
}
