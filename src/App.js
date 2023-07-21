import React from 'react';
// import logo from './logo.svg';
import './App.css';
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
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
