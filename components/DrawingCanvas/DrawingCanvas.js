import React, { useRef, useState, useEffect } from 'react'
import styles from './DrawingCanvas.module.sass'
import { canvasMouseDown, canvasMouseUp, canvasMouseMove } from './mouseSupport'
import {
  canvasTouchStart,
  canvasTouchEnd,
  canvasTouchMove,
} from './touchSupport'

const redraw = ctx => ({ state }) => {
  const { lines } = state

  for (const points of lines) {
    ctx.beginPath()

    for (const i in points) {
      const point = points[i]

      if (i == 0) {
        ctx.moveTo(point.x * CANVAS_SCALE, point.y * CANVAS_SCALE)
        continue
      }

      ctx.lineTo(point.x * CANVAS_SCALE, point.y * CANVAS_SCALE)
    }
    ctx.stroke()
  }
}

export const startDrawing = ({ state, setState }) => {
  const lines = [[], ...state.lines]

  setState({
    ...state,
    isDrawing: true,
    lines,
  })
}

export const endDrawing = ({ state, setState }) => {
  setState({
    ...state,
    isDrawing: false,
  })
}

export const drawMove = ({ state, setState }, point) => {
  const lines = state.lines
  lines[0] = [point, ...lines[0]]

  setState({
    ...state,
    lines,
  })
}

const defaultState = {
  isDrawing: false,
  prevPos: null,
  lines: [],
}

let context = null
const CANVAS_SCALE = 2
const setupContext = (canvas, { width, height }) => {
  console.log('setup canvas', canvas)
  if (canvas == null) {
    context = null
    return
  }

  canvas.width = width * CANVAS_SCALE
  canvas.height = height * CANVAS_SCALE

  context = canvas.getContext('2d')
  context.lineJoin = 'round'
  context.lineCap = 'round'
  context.lineWidth = 2 * CANVAS_SCALE
}

export default function DrawingCanvas({ width, height }) {
  const canvasEl = useRef(null)
  const [state, setState] = useState(defaultState)
  const stateObj = { state, setState }

  useEffect(() => {
    setupContext(canvasEl.current, { width, height })
  }, [canvasEl])

  if (canvasEl.current) redraw(context)(stateObj)

  const mouseDown = canvasMouseDown(canvasEl)(stateObj)
  const mouseUp = canvasMouseUp(canvasEl)(stateObj)
  const mouseMove = canvasMouseMove(canvasEl)(stateObj)

  const touchStart = canvasTouchStart(stateObj)
  const touchEnd = canvasTouchEnd(stateObj)
  const touchMove = canvasTouchMove(canvasEl)(stateObj)

  return (
    <canvas
      id="drawing-canvas"
      className={styles.drawingCanvas}
      style={{ width: `${width}px`, height: `${height}px` }}
      ref={canvasEl}
      onMouseDown={mouseDown}
      onMouseUp={mouseUp}
      onMouseMove={mouseMove}
      onMouseLeave={mouseUp}
      onTouchStart={touchStart}
      onTouchEnd={touchEnd}
      onTouchMove={touchMove}
      onScroll={e => e.preventDefault()}
    />
  )
}
