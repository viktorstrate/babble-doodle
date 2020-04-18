import Layout from '../components/Layout'
import { useEffect } from 'react'

const newGame = async event => {
  let res = await fetch('/api/new-game', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      socketSession: '1234',
    }),
  })

  res = await res.json()

  if (!res.ok) {
    alert('Could not start game', res.message)
    return
  }

  const { lobby } = res
  location.href = `/game/${lobby.id}`
}

export default function Home() {
  useEffect(() => {
    const socket = window.io()
    console.log(socket)
  }, [])

  return (
    <Layout>
      <h1>Babble Doodle</h1>
      <p>A social party game about drawing and explaining</p>
      <button onClick={newGame}>New game</button>
    </Layout>
  )
}
