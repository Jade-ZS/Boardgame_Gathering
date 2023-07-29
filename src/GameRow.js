import './GameRow.css';
import Card from './Card'
import PropTypes from 'prop-types'

export default function GameRow({category, games}) {
  return (
    <div className='game-row'>
      <div className='heading-container'>
        <h1>{category}</h1>
      </div>
      <div className='row-card-container'>
      {games.map((game) => {
        return <Card name={game.name} imgSrc={game['image_url']} key={game.id} id={game.id}/>
      })}
      </div>
     
    </div>
  )
}

GameRow.propTypes = {
  games: PropTypes.array.isRequired,
  category: PropTypes.string.isRequired,
}