import { startDrawing, endDrawing, drawMove } from './DrawingCanvas'

export const canvasMouseDown = canvasEl => stateObj => event => {
  if (event.target == canvasEl.current) event.preventDefault()

  startDrawing(stateObj)
}

export const canvasMouseUp = canvasEl => stateObj => event => {
  if (event.target == canvasEl.current) event.preventDefault()

  endDrawing(stateObj)
}

export const canvasMouseMove = canvasEl => ({ state, setState }) => event => {
  if (!state.isDrawing) return
  if (event.target == canvasEl.current) event.preventDefault()

  const { offsetX, offsetY } = event.nativeEvent

  const point = {
    x: offsetX,
    y: offsetY,
  }

  drawMove({ state, setState }, point)
}
