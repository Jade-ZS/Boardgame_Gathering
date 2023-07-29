import './Card.css';
import { React } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Card({name ,imgSrc, id}) {

  return (
    <Link to={`/${id}`}>
      
    <div className='card'>
      <img src={imgSrc}/>
      <p>{name}</p>
    </div>
    </Link>
  )
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
}