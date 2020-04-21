import React, { useState } from 'react'
import Button from '../../../Button'
import PaintingWithAvatar from '../../../PaintingWithAvatar'
import styled from 'styled-components'

const VoteContainer = styled.div`
  display: inline-block;
  margin: 4px 8px;
`

const newRound = socket => () => {
  socket.emit('new-round')
}

export default function GameScores({ socket, gameStateObj }) {
  const { gameState } = gameStateObj

  const [votedNewRound, setVotedNewRound] = useState(false)

  const votes = gameState.round.votes.slice().sort().reverse()

  const voteElms = votes.map(vote => (
    <VoteContainer key={vote.id}>
      <PaintingWithAvatar
        localPlayer={vote.id == socket.id}
        avatarImage={gameState.players.find(x => x.id == vote.id).image}
        paintingImage={vote.image}
      />
      <h2>Votes: {vote.votes}</h2>
    </VoteContainer>
  ))

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
