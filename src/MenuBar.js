import './MenuBar.css';

export default function MenuBar() {
  return (
    <div className='menu-bar'>
      <div className='to-my-favorites-button'>
        <p>My Favorites</p>
      </div>
      <div className='discover-button'>
        <p>Discover</p>
      </div>
      <div className='search-bar'>
        <input type='text' placeholder='game name'/>
        <button className='search-button'>Search</button>
      </div>
    </div>
  )
}