import React from 'react'
import PropTypes from 'prop-types'
import './Locations.css'
import { useOutletContext } from 'react-router-dom'

function Locations(props) {
  
  const { game } = useOutletContext()

  const locations = game.sku_objects.reduce((acc, curr) => {
    if (!acc.includes(curr.name)) {
      acc.push(curr.name)
    }
    return acc
  }, [])

  console.log('local', locations)

  const retailLocations = locations.map((location, index) => (
    // figure out a better key identifier
    <div key={index + 1} className="retail-location">
      <p>{location}</p>
    </div>
  ))
  return (
    <div className='location-container'>
    {retailLocations}
    </div>
  )
}

Locations.propTypes = {}

export default Locations

