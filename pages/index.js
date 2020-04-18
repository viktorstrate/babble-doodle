import Layout from '../components/Layout'
import DrawingCanvas from '../components/DrawingCanvas/DrawingCanvas'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    const socket = window.io()
    console.log(socket)
  }, [])

  return (
    <Layout>
      <h1>Babble Doodle</h1>
      <p>A social party game about drawing and explaining</p>
      <h2>Draw you character</h2>
      <DrawingCanvas width="200" height="200" />
      <br />
      <button>New game</button>
    </Layout>
  )
}
