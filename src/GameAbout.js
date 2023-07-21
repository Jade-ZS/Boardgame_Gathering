import React from 'react'
import PropTypes from 'prop-types'
import { useOutletContext } from 'react-router-dom'
import './GameAbout.css'

function GameAbout(props) {

  const { game } = useOutletContext()

  return (
    <div className='about-container'>
      <div className='about'>
        <p>{game.description_preview}</p>
      </div>
    </div>
  )
}

GameAbout.propTypes = {}

export default GameAbout
