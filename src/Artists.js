import React from 'react'
import PropTypes from 'prop-types'
import './Artists.css'
import { useOutletContext } from 'react-router-dom'

function Artists(props) {
  
  const { game } = useOutletContext()
  
  return (
    <div>Artists</div>
  )
}

Artists.propTypes = {}

export default Artists

