import React from 'react'
import Layout from '../components/Layout'
import { useRouter } from 'next/router'
import Logo from '../components/Logo/Logo'

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
      <Logo />
      <p>A social party game about drawing and explaining</p>
      <button onClick={newGame(router)}>New game</button>
    </Layout>
  )
}
