import React, { useState } from 'react'
import Button from '../../../Button'
import PaintingWithAvatar from '../../../PaintingWithAvatar'
import styled from 'styled-components'
import DrawingCanvas from '../../../DrawingCanvas/DrawingCanvas'

const VoteContainer = styled.div`
  display: inline-block;
  vertical-align: top;
  margin: 4px 8px;
  min-width: 320px;
  min-height: 320px;
  position: relative;
`

const DisconnectedUserCanvas = styled(DrawingCanvas)`
  background-color: #eee;
  margin-top: 20px;
`

const DisconnectedUserNotice = styled.p`
  position: absolute;
  color: red;
  top: 20px;
  left: 20px;
`

const newRound = socket => () => {
  socket.emit('new-round')
}

export default function GameScores({ socket, gameStateObj }) {
  const { gameState } = gameStateObj

  const [votedNewRound, setVotedNewRound] = useState(false)

  const votes = gameState.round.votes
    .slice()
    .sort()
    .reverse()
    .map(vote => ({
      ...vote,
      player: gameState.players.find(player => player.id == vote.id),
    }))

  const voteElms = votes.map(vote => {
    if (vote.player == null) {
      return (
        <VoteContainer key={vote.id}>
          <DisconnectedUserNotice>User has disconnected</DisconnectedUserNotice>
          <DisconnectedUserCanvas
            width="300"
            height="300"
            imageState={{ image: vote.image }}
          />
          <h2>Votes: {vote.votes}</h2>
        </VoteContainer>
      )
    }

    return (
      <VoteContainer key={vote.id}>
        <PaintingWithAvatar
          localPlayer={vote.id == socket.id}
          avatarImage={vote.player.image}
          paintingImage={vote.image}
        />
        <h2>Votes: {vote.votes}</h2>
      </VoteContainer>
    )
  })

  return (
    <div>
      <h1>Scores</h1>
      {voteElms}
      <br />
      <Button
        disabled={votedNewRound}
        onClick={() => {
          newRound(socket)()
          setVotedNewRound(true)
        }}
      >
        New round
      </Button>
      {votedNewRound && (
        <p>Waiting for other players to vote for a new round</p>
      )}
    </div>
  )
}
