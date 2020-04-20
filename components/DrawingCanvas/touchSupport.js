import { startDrawing, endDrawing, drawMove } from './DrawingCanvas'

export const canvasTouchStart = canvasEl => stateObj => event => {
  event.preventDefault()

  const point = touchPos(canvasEl.current, event)
  startDrawing(stateObj, point)
}

export const canvasTouchEnd = stateObj => event => {
  event.preventDefault()

  endDrawing(stateObj)
}

export const canvasTouchMove = canvasEl => stateObj => event => {
  event.preventDefault()

  const point = touchPos(canvasEl.current, event)
  drawMove(stateObj, point)
}

const touchPos = (canvas, event) => {
  const rect = canvas.getBoundingClientRect()

  return {
    x: event.touches[0].clientX - rect.left,
    y: event.touches[0].clientY - rect.top,
  }
}
