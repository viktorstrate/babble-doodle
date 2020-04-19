import React from 'react'
import DrawingCanvas, {
  initialState as initialImageState,
} from '../../DrawingCanvas/DrawingCanvas'
import { useState } from 'react'

const joinGame = (socket, image) => {
  socket.emit('join-game', { image })
}

export default function JoinGame({ socket, gameStateObj }) {
  const [imageState, setImageState] = useState(initialImageState)

  return (
    <div>
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
        onClick={() => joinGame(socket, imageState.image, gameStateObj)}
      >
        Join game
      </button>
    </div>
  )
}
