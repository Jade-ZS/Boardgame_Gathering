import React from 'react'
import PropTypes from 'prop-types'
import './GameDisplay.css'
import { useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

function GameDisplay() {
  
const [game, setGame] = useState([])

  useEffect(() => {
    fetch('https://api.boardgameatlas.com/api/search?name=Catan&client_id=JLBr5npPhV')
    .then(response => response.json())
    .then(data => setGame([data.games[0]]))
  }, [])
  
  console.log(game)
  return (
    game.map(game => (
    <section className='game-display'>
      <div className='game-intro'>
        <div className='thumbnail'>
          <img src={game.images.medium} alt={`${game.handle} thumbnail`} />
        </div> 
        <div className='intro'>
          <h1>{game.handle}</h1>
          <p>{game.players}</p>
          <p>{game.average_user_rating.toFixed(2)}</p>
        </div> 
      </div>
      <nav className='game-details'>
        <NavLink to=".">About</NavLink>
        <NavLink to="/game/rules">Rules</NavLink>
        <NavLink to="/game/reviews">Reviews</NavLink>
      </nav>
      <Outlet />
    </section>
  )))
}

GameDisplay.propTypes = {}

export default GameDisplay
