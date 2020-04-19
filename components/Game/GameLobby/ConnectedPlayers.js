import DrawingCanvas from '../../DrawingCanvas/DrawingCanvas'

export default function ConnectedPlayers({ players }) {
  return (
    <div>
      <h2>Connected players</h2>
      {players.map(player => (
        <div key={player.id}>
          <p>Player: {player.id}</p>
          <DrawingCanvas
            width="150"
            height="150"
            imageState={{ image: player.image }}
          />
        </div>
      ))}
    </div>
  )
}
