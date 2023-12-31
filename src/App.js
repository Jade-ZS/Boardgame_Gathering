import './App.css';
import GameCards from './GameCards';
import MenuBar from './MenuBar';
import Banner from './Banner';
// import {getData} from './ApiCalls';
import {useEffect, useState} from 'react';

import GameDisplay from './GameDisplay'
import {Routes, Route, NavLink } from 'react-router-dom'
import GameAbout from './GameAbout';
import Locations from './Locations';
import Artists from './Artists';
import ErrorDisplay from './ErrorDisplay';
import Offline from './Offline.js'

import {dataKF, dataPG, dataNR, dataGeneral} from './data'

function App() {

  const [games, setGames] = useState([]);
  const [error, setError] = useState('');
  const [newRelease, setNewRelease] = useState([]);
  const [partyGames, setPartyGames] = useState([]);
  const [kidFriendly, setKidFriendly] = useState([]);
  const addErr = err => setError(err);
  const allGames = [...games, ...newRelease, ...kidFriendly, ...partyGames];
  const [offline, setOffline] = useState(false);


  

  useEffect(() => {
    if(!navigator.onLine) {
      setOffline(true);
    }
    setKidFriendly(dataKF.games)
    setPartyGames(dataPG.games)
    setNewRelease(dataNR.games)
    setGames(dataGeneral.games)

    // getData('&order_by=rank&ascending=false&pretty=true')
    //   .then(data => setGames(data.games)) 
    //   .catch(error => setError(error))
    // getData('&gt_year_published=2021')
    //   .then(data => setNewRelease(data.games))
    //   .catch(error => setError(error))
    // getData('&min_players=4')
    //   .then(data => setPartyGames(data.games))
    //   .catch(error => setError(error))
    // getData('&min_age=6')
    //   .then(data => setKidFriendly(data.games))
    //   .catch(error => setError(error))
  }, [])

  //`https://temp-bga-api-c4bd0c7481bf.herokuapp.com/api/search?&order_by=rank&ascending=false&pretty=true&client_id=Efb4IXjG2E`

  return (
  <div>
     <Offline offline={offline}/>
    <Routes>
      <Route path="/" element={<><Banner  games={allGames} /> <MenuBar /><GameCards games={allGames} newRelease={newRelease} kidFriendly={kidFriendly} partyGames={partyGames} /></>} />
      <Route path="/:id" element={ error ? <ErrorDisplay fetchError={error}/> : <GameDisplay addErr={addErr} games={allGames} />}>
        <Route index element={<GameAbout />} />
        <Route path="locations" element={<Locations />} />
        <Route path="artists" element={<Artists />} />
      </Route>
      <Route path='*' element={<ErrorDisplay fetchError={error}/>} />
    </Routes>
  </div>
  );
}

export default App;
