import './Card.css';
import { React } from 'react';
import { Link } from 'react-router-dom';

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