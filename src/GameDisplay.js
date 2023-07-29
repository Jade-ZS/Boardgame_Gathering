import React from 'react'
import PropTypes from 'prop-types'
import './GameDisplay.css'
import { useEffect, useState } from 'react'
import { NavLink, Outlet, Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
//need to import useParams
function GameDisplay({games, kidFriendly, partyGames, newRelease}) {
games = [...games, ...kidFriendly, ...partyGames, ...newRelease];
const {id} = useParams()

//const { id } = useParams()

  // useEffect(() => {
  //   //interpelate the id from the url into the fetch call
  //   fetch('https://api.boardgameatlas.com/api/search?order_by=rank&ascending=false&client_id=JLBr5npPhV')
  //   .then(response => response.json())
  //   .then(data => setGame([data.games[0]]))
  // }, [])
  
  const game = games.filter(game => game.id === id)
  // console.log(game)
  return (
    game.map(game => (
    <section className='game-display' key={id}>
      <div className='home-button'>
        <Link to="/"><p><span>⌂</span></p></Link>
        
      </div>
      <div className='game-details'>
        <div className='thumbnail'>
          <img src={game.images.medium} alt={`${game.handle} thumbnail`} />
        </div> 
        <div className='details'>
          {game.msrp_text ? <h4 style={{backgroundColor: 'black', color: 'lightGreen'}}>{game.msrp_text}</h4> : null}
          <h4 style={{backgroundColor: 'black', color: 'lightBlue'}}>{game.players} Players</h4>
          <h4 style={{backgroundColor: 'black', color: 'red'}}>Ages {game.min_age}+</h4>
          {game.average_user_rating > 0 ? <h4 style={{backgroundColor: 'black', color: 'yellow'}}>{game.average_user_rating.toFixed(2)} ⭐️</h4> : null}
        </div> 
      </div>
      <div className="links">
        <nav className='game-nav'>
          {(game.description_preview.length > 0) && <NavLink to="." end className={({isActive}) => isActive ? 'active' : 'game-nav a'}>About</NavLink>}
          {game.sku_objects && <NavLink to="locations">Locations</NavLink>}
          {(game.artists.length > 0) && <NavLink to="artists">Artists</NavLink>}
        </nav>
      </div>
      <Outlet context={{game}}/>
    </section>
  )))
}

GameDisplay.propTypes = {
  games: PropTypes.array.isRequired,
  newRelease: PropTypes.array.isRequired,
  kidFriendly: PropTypes.array.isRequired,
  partyGames: PropTypes.array.isRequired
}

export default GameDisplay
