import { useRouter } from 'next/router'
import Layout from '../../components/Layout'

export default function Game() {
  const router = useRouter()
  const { game_id } = router.query

  return (
    <Layout>
      <h1>Babble Doodle Game</h1>
      <p>Welcome to game: {game_id}</p>
    </Layout>
  )
}
