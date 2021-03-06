import React, { useRef, useEffect, useState } from 'react'
import { canvasMouseDown, canvasMouseUp, canvasMouseMove } from './mouseSupport'
import {
  canvasTouchStart,
  canvasTouchEnd,
  canvasTouchMove,
} from './touchSupport'
import styled from 'styled-components'

const StyledCanvas = styled.canvas`
  border: 2px solid #ccc;
  touch-action: none;
  background-color: white;
  user-select: none;
`

const redraw = ctx => ({ state }) => {
  const { lines } = state.image

  for (const line of lines) {
    ctx.beginPath()

    for (const i in line.path) {
      const [x, y] = line.path[i]

      ctx.lineTo(x * CANVAS_SCALE, y * CANVAS_SCALE)

      // Show dot if line consists of a single point
      if (line.path.length == 1)
        ctx.lineTo(x * CANVAS_SCALE + 1, y * CANVAS_SCALE + 1)
    }

    ctx.stroke()
  }
}

export const startDrawing = ({ state, setState }, point) => {
  const lines = [{ path: [[point.x, point.y]] }, ...state.image.lines]

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

const CANVAS_SCALE = 2
const setupContext = (canvas, { width, height }, setContext) => {
  console.log('setup canvas', canvas)
  if (canvas == null) {
    return
  }

  canvas.width = width * CANVAS_SCALE
  canvas.height = height * CANVAS_SCALE

  const context = canvas.getContext('2d')
  context.lineJoin = 'round'
  context.lineCap = 'round'
  context.lineWidth = 2 * CANVAS_SCALE
  setContext(context)
}

export default function DrawingCanvas({
  className,
  width = 100,
  height = 100,
  setImageState: setState = () => {},
  imageState: state,
}) {
  const canvasEl = useRef(null)
  const [context, setContext] = useState(null)
  const stateObj = { state, setState }

  useEffect(() => {
    console.log('Setup canvas', canvasEl, state)

    const canvasWidth = state.image.width || width
    const canvasHeight = state.image.height || height

    setupContext(
      canvasEl.current,
      { width: canvasWidth, height: canvasHeight },
      setContext
    )
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

  const touchStart = canvasTouchStart(canvasEl)(stateObj)
  const touchEnd = canvasTouchEnd(stateObj)
  const touchMove = canvasTouchMove(canvasEl)(stateObj)

  return (
    <StyledCanvas
      className={`drawing-canvas ${className}`}
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
