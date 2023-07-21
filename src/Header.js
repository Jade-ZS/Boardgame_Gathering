import './Header.css';

export default function Header() {
  return (
    <div className='header'>
      <div className='to-my-favorites-button'>My Favorites</div>
      <div className='discover-button'>Discover</div>
      <div className='search-bar'>
        <input type='text' placeholder='game name'/>
        <button className='search-button'>Search</button>
      </div>
    </div>
  )
}