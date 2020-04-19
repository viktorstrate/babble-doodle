import React from 'react'
import PaintingWithAvatar from '../../../PaintingWithAvatar'

export default function GameScores({ socket, gameStateObj }) {
  const { gameState } = gameStateObj

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
    </div>
  )
}
