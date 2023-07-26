
import './App.css';
import GameCards from './GameCards';
import MenuBar from './MenuBar';
import Banner from './Banner';
import {getData} from './ApiCalls';
import {useEffect, useState} from 'react';

import GameDisplay from './GameDisplay'
import {Routes, Route, NavLink } from 'react-router-dom'
import GameAbout from './GameAbout';
import Locations from './Locations';
import Artists from './Artists';


function App() {

  const [games, setGames] = useState([]);
  const [error, setError] = useState('');
  const [newRelease, setNewRelease] = useState([]);
  const [partyGames, setPartyGames] = useState([]);
  const [kidFriendly, setKidFriendly] = useState([]);
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    if(!navigator.onLine) {
      setOffline(true);
    }

    getData('&order_by=rank&ascending=false&pretty=true')
      .then(data => setGames(data.games)) 
      .catch(error => setError(error))
    getData('&gt_year_published=2021')
      .then(data => setNewRelease(data.games))
      .catch(error => setError(error))
    getData('&min_age=14&min_players=7')
      .then(data => setPartyGames(data.games))
      .catch(error => setError(error))
    getData('&min_age=6')
      .then(data => setKidFriendly(data.games))
      .catch(error => setError(error))
  }, [])

  return (
    <div>
    <Routes>
      <Route path="/" element={<><Banner  games={games} newRelease={newRelease} kidFriendly={kidFriendly} partyGames={partyGames} offline={offline}/> <MenuBar /><GameCards games={games} newRelease={newRelease} kidFriendly={kidFriendly} partyGames={partyGames} /></>} />
      <Route path="/:id" element={<GameDisplay games={games} newRelease={newRelease} kidFriendly={kidFriendly} partyGames={partyGames}/>}>
        <Route index element={<GameAbout />} />
        <Route path="locations" element={<Locations />} />
        <Route path="artists" element={<Artists />} />
      </Route>
    </Routes>
  </div>
  );
}

export default App;
