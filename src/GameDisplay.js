import React from 'react'
import PropTypes from 'prop-types'
import './GameDisplay.css'
import { useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
//need to import useParams
function GameDisplay() {
  
const [game, setGame] = useState([])
//const { id } = useParams()

  useEffect(() => {
    //interpelate the id from the url into the fetch call
    fetch('https://api.boardgameatlas.com/api/search?order_by=rank&ascending=false&client_id=JLBr5npPhV')
    .then(response => response.json())
    .then(data => setGame([data.games[0]]))
  }, [])
  
  console.log(game)
  return (
    game.map(game => (
    <section className='game-display'>
      <div className='game-details'>
        <div className='thumbnail'>
          <img src={game.images.thumb} alt={`${game.handle} thumbnail`} />
        </div> 
        <div className='details'>
          <h4 style={{backgroundColor: 'black', color: 'lightGreen'}}>{game.msrp_text}</h4>
          <h4 style={{backgroundColor: 'black', color: 'lightBlue'}}>{game.players} Players</h4>
          <h4 style={{backgroundColor: 'black', color: 'red'}}>ages {game.min_age}+</h4>
          <h4 style={{backgroundColor: 'black', color: 'yellow'}}>{game.average_user_rating.toFixed(2)} ⭐️</h4>
        </div> 
      </div>
      <div className="links">
        <nav className='game-nav'>
          <NavLink to="." end className={({isActive}) => isActive ? 'active' : 'game-nav a'}>About</NavLink>
          <NavLink to="/game/rules">Rules</NavLink>
          <NavLink to="/game/reviews">Reviews</NavLink>
        </nav>
      </div>
      <Outlet context={{game}}/>
    </section>
  )))
}

GameDisplay.propTypes = {}

export default GameDisplay
