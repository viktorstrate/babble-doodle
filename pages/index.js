import Layout from '../components/Layout'
import DrawingCanvas from '../components/DrawingCanvas/DrawingCanvas'

export default function Home() {
  return (
    <Layout>
      <h1>Babble Doodle</h1>
      <p>A social party game about drawing and explaining</p>
      <DrawingCanvas />
    </Layout>
  )
}
