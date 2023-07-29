import React from 'react'
import PropTypes from 'prop-types'
import './Artists.css'
import { useOutletContext } from 'react-router-dom'

function Artists(props) {
  
  const { game } = useOutletContext()
  const artists = game.artists.map(artist => (
    <div key={game.id} className='artist'>
      <p>{artist}</p>
    </div>
  ))

  return (
    <div className='artist-container'>
      {artists}
    </div>
  )
}

Artists.propTypes = {}


export default Artists

