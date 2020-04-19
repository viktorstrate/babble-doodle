import React from 'react'
import Layout from '../components/Layout'
import { useRouter } from 'next/router'

const newGame = router => async () => {
  let res = await fetch('/api/new-game', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  })

  res = await res.json()

  if (!res.ok) {
    alert('Could not start game', res.message)
    return
  }

  const { game } = res
  router.push(`/game/${game.id}`)
}

export default function Home() {
  const router = useRouter()

  return (
    <Layout>
      <h1>Babble Doodle</h1>
      <p>A social party game about drawing and explaining</p>
      <button onClick={newGame(router)}>New game</button>
    </Layout>
  )
}
