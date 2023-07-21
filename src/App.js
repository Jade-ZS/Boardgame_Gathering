import './App.css';
import GameCards from './GameCards';
import MenuBar from './MenuBar';
import Banner from './Banner';
import {getData} from './ApiCalls';
import {useEffect, useState} from 'react';


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
    </div>
  );
}

export default App;
