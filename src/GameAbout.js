import React from 'react'
import { useOutletContext } from 'react-router-dom'
import './GameAbout.css'

function GameAbout() {

  const { game } = useOutletContext()

  return (
    <div className={`about-container ${!game.description_preview.length && 'hidden'}`}>
      <div className='about'>
        <p>{game.description_preview}</p>
      </div>
    </div>
  )
}


export default GameAbout
