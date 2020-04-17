import { startDrawing, endDrawing, drawMove } from './DrawingCanvas'

export const canvasTouchStart = canvasEl => stateObj => event => {
  if (event.target == canvasEl.current) event.preventDefault()

  startDrawing(stateObj)
}

export const canvasTouchEnd = canvasEl => stateObj => event => {
  if (event.target == canvasEl.current) event.preventDefault()

  endDrawing(stateObj)
}

export const canvasTouchMove = canvasEl => stateObj => event => {
  if (event.target == canvasEl.current) event.preventDefault()

  const point = touchPos(canvasEl.current, event)
  drawMove(stateObj, point)
}

const touchPos = (canvas, event) => {
  const rect = canvas.getBoundingClientRect()
  const scrollOffset = document.documentElement.scrollTop
  return {
    x: event.touches[0].clientX - rect.left,
    y: event.touches[0].clientY - rect.top - scrollOffset,
  }
}
