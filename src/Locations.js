import React from 'react'
import './Locations.css'
import { useOutletContext } from 'react-router-dom'

function Locations() {
  let locations;
  const { game } = useOutletContext()

  locations = game.sku_objects.reduce((acc, curr) => {
    if (!acc.includes(curr.name)) {
      acc.push(curr.name)
    }
    return acc
  }, []).sort()

  const retailLocations = locations.map((location, index) => {
    return (
    <div key={index + 1} className="retail-location">
      <p>{location}</p>
    </div>
    ) 
})
  return (
    <div className='location-container'>
    {retailLocations}
    </div>
  )
}

export default Locations

