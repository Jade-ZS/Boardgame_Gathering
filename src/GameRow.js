import './GameRow.css';

export default function GameRow({category}) {
  return (
    <div className='game-row'>
      <div className='heading-container'>
        <h1>{category}</h1>
        <p>show all</p>
      </div>
      <div className='row-card-container'>
        {/**map some cards here */}
        <div className='test-card'></div>
        <div className='test-card'></div>
        <div className='test-card'></div>
        <div className='test-card'></div>
        <div className='test-card'></div>
        <div className='test-card'></div>
        <div className='test-card'></div>
        <div className='test-card'></div>
        <div className='test-card'></div>
        <div className='test-card'></div>
        <div className='test-card'></div>
        <div className='test-card'></div>
      </div>
     
    </div>
  )
}