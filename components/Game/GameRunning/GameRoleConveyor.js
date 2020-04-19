import DrawingCanvas, {
  initialState as initialCanvasState,
} from '../../DrawingCanvas/DrawingCanvas'
import { useState, useEffect } from 'react'

export default function GameRoleConveyor({ socket, gameStateObj }) {
  const [imageState, setImageState] = useState(null)

  useEffect(() => {
    socket.on('painter-paint', ({ image }) => {
      setImageState({
        ...initialCanvasState,
        image,
      })
    })
  }, [])

  let canvas = null
  if (imageState != null)
    canvas = <DrawingCanvas imageState={imageState} width="640" height="480" />

  return (
    <div>
      <h2>You are the conveyor</h2>
      <p>Tell the other players what is being drawn</p>
      {canvas}
    </div>
  )
}
