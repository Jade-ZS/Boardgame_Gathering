import './GameCards.css';
import Card from './Card';
import GameRow from './GameRow';

export default function GameCards() {
  return (
    <div className='game-cards-container'>
      <GameRow category='Trending'/>
      <GameRow category='New Release'/>
      <GameRow category='Classic'/>
    </div>
  )
}