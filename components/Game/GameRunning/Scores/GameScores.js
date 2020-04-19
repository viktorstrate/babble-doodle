import React, { useState } from 'react'
import PaintingWithAvatar from '../../../PaintingWithAvatar'

const newRound = socket => () => {
  socket.emit('new-round')
}

export default function GameScores({ socket, gameStateObj }) {
  const { gameState } = gameStateObj

  const [votedNewRound, setVotedNewRound] = useState(false)

  const votes = gameState.round.votes

  const voteElms = votes.map(vote => (
    <div key={vote.id}>
      Player: {vote.id}
      <br />
      Votes: {vote.votes}
      <br />
      <PaintingWithAvatar
        avatarImage={gameState.players.find(x => x.id == vote.id).image}
        paintingImage={vote.image}
      />
    </div>
  ))

  return (
    <div>
      <h1>Scores</h1>
      {voteElms}
      <button
        disabled={votedNewRound}
        onClick={() => {
          newRound(socket)()
          setVotedNewRound(true)
        }}
      >
        New round
      </button>
    </div>
  )
}
