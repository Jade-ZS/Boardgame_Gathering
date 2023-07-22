import './GameRow.css';
import Card from './Card'

export default function GameRow({category, games}) {
  return (
    <div className='game-row'>
      <div className='heading-container'>
        <h1>{category}</h1>
        <p>show all</p>
      </div>
      <div className='row-card-container'>
      {games.map((game) => {
        // console.log('keynames: ', Object.keys(game))
        console.log('game.id: ', game.id)
        return <Card name={game.name} imgSrc={game['image_url']} key={game.id} id={game.id}/>
      })}
      </div>
     
    </div>
  )
}