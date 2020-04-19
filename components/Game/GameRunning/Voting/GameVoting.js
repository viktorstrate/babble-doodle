import React from 'react'
import DrawingCanvas, {
  initialState as initialCanvasState,
} from '../../../DrawingCanvas/DrawingCanvas'
import styled from 'styled-components'

const ParticipantContainer = styled.div`
  display: inline-block;
  margin: 10px;

  ${({ votedThis }) =>
    votedThis
      ? `
    & canvas {
      border: 2px solid orange;
    }
    `
      : `
    &:hover canvas {
      border: 2px solid orange;
      cursor: pointer;
    }
  `}
`

const vote = (socket, id) => () => {
  console.log('voted')
  socket.emit('vote', { id })
}

export default function GameVoting({ socket, gameStateObj }) {
  const { gameState } = gameStateObj

  const playerImages = gameState.round.result.players

  const painterImage = playerImages.find(player => player.role == 'painter')
    .image

  const participants = playerImages.filter(
    player => player.role == 'participant'
  )

  const votedId = gameState.round.voted

  let participantDrawings = participants
    // .filter(x => x.id != socket.id)
    .map(participant => (
      <ParticipantContainer
        key={participant.id}
        onClick={votedId == null ? vote(socket, participant.id) : null}
        votedThis={votedId == participant.id}
      >
        <DrawingCanvas
          imageState={{ ...initialCanvasState, image: participant.image }}
          width="250"
          height="250"
        />
      </ParticipantContainer>
    ))

  return (
    <div>
      <h1>Round has ended</h1>
      <p>Vote for your favorite</p>
      <h2>{"Painter's drawing"}</h2>
      <DrawingCanvas
        imageState={{ ...initialCanvasState, image: painterImage }}
        width="400"
        height="400"
      />
      <h2>Participant drawings</h2>
      {participantDrawings}
    </div>
  )
}
