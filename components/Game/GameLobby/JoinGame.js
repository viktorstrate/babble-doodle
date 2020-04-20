import React from 'react'
import DrawingCanvas, {
  initialState as initialImageState,
} from '../../DrawingCanvas/DrawingCanvas'
import { useState } from 'react'
import styled from 'styled-components'
import Button from '../../Button'

const YourCharacterCanvas = styled(DrawingCanvas)`
  width: 200px;
  height: 200px;
  border: 2px solid #ffc974;
`

const joinGame = (socket, image) => {
  socket.emit('join-game', { image })
}

export default function JoinGame({ socket, gameStateObj }) {
  const [imageState, setImageState] = useState(initialImageState)

  return (
    <div>
      <h2>Draw your character</h2>
      <YourCharacterCanvas
        width="200"
        height="200"
        setImageState={setImageState}
        imageState={imageState}
      />
      <br />
      <Button
        disabled={socket == null || imageState.image.lines.length == 0}
        onClick={() => joinGame(socket, imageState.image, gameStateObj)}
      >
        Join game
      </Button>
    </div>
  )
}
