import React from 'react'
import DrawingCanvas from './DrawingCanvas/DrawingCanvas'
import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  width: 320px;
  height: 320px;
  padding-top: 20px;
`

const AvatarCanvas = styled(DrawingCanvas)`
  position: absolute;
  top: 0;
  right: 0;

  ${({ localPlayer }) =>
    localPlayer &&
    `
    border-color: orange;
  `}
`

export default function PaintingWithAvatar({
  avatarImage,
  paintingImage,
  localPlayer = false,
}) {
  return (
    <Container>
      <AvatarCanvas
        localPlayer={localPlayer}
        imageState={{
          image: avatarImage,
        }}
        width="100"
        height="100"
      />
      <DrawingCanvas
        imageState={{ image: paintingImage }}
        width="300"
        height="300"
      />
    </Container>
  )
}
