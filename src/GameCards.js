import './GameCards.css';
import GameRow from './GameRow';
import SearchResult from './SearchResult';
import { useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types'; 

export default function GameCards({games, kidFriendly, partyGames, newRelease}) {
  const [ searchParam ] = useSearchParams();
  const nameParam = searchParam.get('name');

  games = [...kidFriendly, ...partyGames, ...newRelease];
  
  const gameRows = (
    <div>
        <GameRow games={newRelease} category='New Release'/>
        <GameRow games={partyGames} category='Party Games'/>
        <GameRow games={kidFriendly} category='Kid Friendly'/>
    </div>);


  return (
    <div className='game-cards-container'>
      { nameParam ? <SearchResult games={games}/> : gameRows}
    </div>
  )
}

GameCards.propTypes = {
  games: PropTypes.array.isRequired,
  newRelease: PropTypes.array.isRequired,
  kidFriendly: PropTypes.array.isRequired,
  partyGames: PropTypes.array.isRequired
}