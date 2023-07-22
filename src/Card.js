import './Card.css';

export default function Card({name ,imgSrc}) {
  return (
    <div className='card'>
      <img src={imgSrc}/>
      <p>{name}</p>
    </div>
  )
}