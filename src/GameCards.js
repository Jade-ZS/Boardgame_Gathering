import './GameCards.css';
import GameRow from './GameRow';
import SearchResult from './SearchResult';
import { useState } from 'react';

export default function GameCards({games, kidFriendly, partyGames, newRelease}) {
  const [searchResults, setSearchResults] = useState([]);
  const [ifSearch, setIfSearch] = useState(false);

  const getSearchResults = searchResults => setSearchResults(searchResults);

  const gameRows = (
    <div>
        <GameRow games={newRelease} category='New Release'/>
        <GameRow games={partyGames} category='Party Games'/>
        <GameRow games={kidFriendly} category='Kid Friendly'/>
    </div>);

  const searchResult = <SearchResult getSearchResults={getSearchResults} games={[...games, ...kidFriendly, ...partyGames, ...newRelease]}/>



  return (
    <div className='game-cards-container'>
      {/* { ? searchResult : gameRows} */}
      
    </div>
  )
}