
import './App.css';
import GameDisplay from './GameDisplay'
import {Routes, Route, NavLink } from 'react-router-dom'
import GameAbout from './GameAbout';
import GameRules from './GameRules';
import GameReviews from './GameReviews';


function App() {
  return (
   <>
    <Routes>
      <Route path="/game" element={<GameDisplay />}>
        <Route index element={<GameAbout />} />
        <Route path="rules" element={<GameRules />} />
        <Route path="reviews" element={<GameReviews />} />
      </Route>
    </Routes>
   </> 
  );
}

export default App;
