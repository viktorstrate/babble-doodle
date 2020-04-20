import { startDrawing, endDrawing, drawMove } from './DrawingCanvas'

export const canvasMouseDown = canvasEl => stateObj => event => {
  if (event.target == canvasEl.current) event.preventDefault()

  startDrawing(stateObj, getPoint(event))
}

export const canvasMouseUp = canvasEl => stateObj => event => {
  if (event.target == canvasEl.current) event.preventDefault()

  endDrawing(stateObj)
}

export const canvasMouseMove = canvasEl => ({ state, setState }) => event => {
  if (!state.isDrawing) return
  if (event.target == canvasEl.current) event.preventDefault()

  drawMove({ state, setState }, getPoint(event))
}

const getPoint = event => {
  const { offsetX, offsetY } = event.nativeEvent

  return {
    x: offsetX,
    y: offsetY,
  }
}
