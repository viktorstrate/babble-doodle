import React from 'react'
import DrawingCanvas, {
  initialState as initialCanvasState,
} from '../../../DrawingCanvas/DrawingCanvas'
import { useState, useRef } from 'react'
import throttle from 'lodash/throttle'

export default function GameRolePainter({ socket, gameStateObj }) {
  const [imageState, setImageState] = useState(initialCanvasState)

  const sendPaintEvent = useRef(
    throttle(newImageState => {
      console.log('Sending paint event')
      socket.emit('participant-paint', {
        image: newImageState.image,
      })
    }, 100)
  ).current

  const onImageUpdate = newImageState => {
    setImageState(newImageState)
    sendPaintEvent(newImageState)
  }

  return (
    <div>
      <h2>You are a participant</h2>
      <p>Draw what the conveyor tells you to draw</p>
      <DrawingCanvas
        setImageState={onImageUpdate}
        imageState={imageState}
        width="640"
        height="480"
      />
    </div>
  )
}
