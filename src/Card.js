import './Card.css';

export default function Card({name ,imgSrc, id}) {

  return (
    <div className='card' id={id} key={id}>
      {console.log('key & id: ', id)}
      <img src={imgSrc}/>
      <p>{name}</p>
    </div>
  )
}