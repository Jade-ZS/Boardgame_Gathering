import logo from './logo.svg';
import './App.css';
import GameCards from './GameCards';
import MenuBar from './MenuBar';
import Banner from './Banner';
import {getData} from './ApiCalls';
import {useEffect, useState} from 'react';

import GameDisplay from './GameDisplay'
import {Routes, Route, NavLink } from 'react-router-dom'
import GameAbout from './GameAbout';
import GameRules from './GameRules';
import GameReviews from './GameReviews';


function App() {

  const [games, setGames] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getData()
      .then(data => setGames(data)) 
      .catch(error => setError(error))
  }, [])

console.log(games)

  return (
    <div>
      <Banner />
      <MenuBar />
      <GameCards />
      <Routes>
        {/* change path to ":id" */}
        <Route path="/game" element={<GameDisplay />}>
          <Route index element={<GameAbout />} />
          <Route path="rules" element={<GameRules />} />
          <Route path="reviews" element={<GameReviews />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
