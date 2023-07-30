import React from 'react'
import './Artists.css'
import { useOutletContext } from 'react-router-dom'

function Artists() {
  
  const { game } = useOutletContext()

  const artists = game.artists.map((artist, i)=> (
    <div key={game.id + i} id={game.id + i} className='artist'>
      <p>{artist}</p>
    </div>
  ))

  return (
    <div className='artist-container'>
      {artists}
    </div>
  )
}


export default Artists

