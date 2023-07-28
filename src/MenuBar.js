import './MenuBar.css';
import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

export default function MenuBar() {

  const [keyword, setKeyword] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = event => {
    setSearchParams({name: keyword})
  }

  const handleChange = event => {
    setKeyword(event.target.value);
    setSearchParams({name: event.target.value})
  }

  return (
    <div className='menu-bar'>
      {/* <div className='to-my-favorites-button'>
        <p>My Favorites</p>
      </div>
      <div className='discover-button'>
        <p>Discover</p>
      </div> */}
      <div className='search-bar'>
        <input type='text' placeholder='game name' onChange={event=> handleChange(event)} value={searchParams.get('name') || ''} />
        <Link to='/'><button className='clear-button'>Clear</button></Link>
      </div>
    </div>
  )
}