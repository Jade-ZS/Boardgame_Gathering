import './GameCards.css';
import Card from './Card';
import GameRow from './GameRow';

export default function GameCards({kidFriendly, partyGames, newRelease}) {
  console.log({partyGames}, {kidFriendly}, {newRelease}, 'asdasdasd')
  return (
    <div className='game-cards-container'>
      <GameRow games={newRelease} category='New Release'/>
      <GameRow games={partyGames} category='Party Games'/>
      <GameRow games={kidFriendly} category='Kid Friendly'/>
    </div>
  )
}