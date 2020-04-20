import React from 'react'
import DrawingCanvas from '../../DrawingCanvas/DrawingCanvas'
import styled from 'styled-components'

const ConnectedPlayerContainer = styled.div`
  display: inline-block;
  margin: 12px;
`

const PlayerCanvas = styled(DrawingCanvas)`
  width: 150px;
  height: 150px;

  ${({ localPlayer }) =>
    localPlayer &&
    `
      border-color: #ffc974;
  `}
`

export default function ConnectedPlayers({ players, socketId }) {
  return (
    <div>
      <h2>Connected players</h2>
      {players.map(player => (
        <ConnectedPlayerContainer key={player.id}>
          <PlayerCanvas
            localPlayer={player.id == socketId}
            imageState={{ image: player.image }}
          />
        </ConnectedPlayerContainer>
      ))}
    </div>
  )
}
