import React, { useState } from 'react'
import DrawingCanvas, {
  initialState as initialCanvasState,
} from '../../../DrawingCanvas/DrawingCanvas'

export default function GameVoting({ socket, gameStateObj }) {
  const { gameState } = gameStateObj

  const [imageState, setImageState] = useState(initialCanvasState)

  const playerDrawings = gameState.round.result

  return (
    <div>
      <h1>Round has ended</h1>
      <p>Vote for your favorite</p>
      <DrawingCanvas imageState={imageState} width="400" height="400" />
    </div>
  )
}
