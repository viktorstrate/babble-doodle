import React, { useRef, useState, useEffect } from 'react'
import styles from './DrawingCanvas.module.sass'
import { canvasMouseDown, canvasMouseUp, canvasMouseMove } from './mouseSupport'
import {
  canvasTouchStart,
  canvasTouchEnd,
  canvasTouchMove,
} from './touchSupport'

const redraw = ctx => ({ state }) => {
  const { lines } = state.image

  for (const line of lines) {
    ctx.beginPath()

    for (const i in line.path) {
      const [x, y] = line.path[i]

      if (i == 0) {
        ctx.moveTo(x * CANVAS_SCALE, y * CANVAS_SCALE)
        continue
      }

      ctx.lineTo(x * CANVAS_SCALE, y * CANVAS_SCALE)
    }
    ctx.stroke()
  }
}

export const startDrawing = ({ state, setState }) => {
  const lines = [{ path: [] }, ...state.image.lines]

  setState({
    ...state,
    isDrawing: true,
    image: {
      ...state.image,
      lines,
    },
  })
}

export const endDrawing = ({ state, setState }) => {
  setState({
    ...state,
    isDrawing: false,
  })
}

export const drawMove = ({ state, setState }, point) => {
  const lines = state.image.lines
  lines[0].path = [[point.x, point.y], ...lines[0].path]

  setState({
    ...state,
    image: {
      ...state.image,
      lines,
    },
  })
}

export const initialState = {
  isDrawing: false,
  prevPos: null,
  image: {
    lines: [],
    width: 0,
    height: 0,
  },
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

export default function DrawingCanvas({
  width = 100,
  height = 100,
  setImageState: setState,
  imageState: state,
}) {
  const canvasEl = useRef(null)
  const stateObj = { state, setState }

  useEffect(() => {
    setupContext(canvasEl.current, { width, height })
  }, [canvasEl])

  useEffect(() => {
    setState({
      ...initialState,
      image: {
        ...initialState.image,
        width,
        height,
      },
    })
  }, [])

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
