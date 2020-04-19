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
`

export default function PaintingWithAvatar({ avatarImage, paintingImage }) {
  return (
    <Container>
      <AvatarCanvas
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
