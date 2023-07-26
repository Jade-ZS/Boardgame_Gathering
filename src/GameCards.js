import './GameCards.css';
import GameRow from './GameRow';
import SearchResult from './SearchResult';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom'; 

export default function GameCards({games, kidFriendly, partyGames, newRelease}) {
  const [ searchParam ] = useSearchParams();
  const nameParam = searchParam.get('name');
  games = [...games, ...kidFriendly, ...partyGames, ...newRelease];

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