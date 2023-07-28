import './GameRow.css';
import Card from './Card'

export default function GameRow({category, games}) {
  return (
    <div className='game-row'>
      <div className='heading-container'>
        <h1>{category}</h1>
        {/* <p>show all</p> */}
      </div>
      <div className='row-card-container'>
      {games.map((game) => {
        return <Card name={game.name} imgSrc={game['image_url']} key={game.id} id={game.id}/>
      })}
      </div>
     
    </div>
  )
}