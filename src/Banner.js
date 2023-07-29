import './Banner.css';
import PopOutMenu from './PopOutMenu';
import { useState } from'react';
import PropTypes from 'prop-types';

export default function Banner({ games, newRelease, kidFriendly, partyGames }) {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  games = [...games,...newRelease,...kidFriendly,...partyGames]
  return (
    <div className='banner'>
      <h1>Boardgame Gathering</h1>
      <div className='filter'>  
        <h2 onClick={handleOpen}>Filter</h2>
        {open && <PopOutMenu games={games} handleClose={handleClose} />}
      </div>
    </div>
  )
}

Banner.propTypes = {
  games: PropTypes.array.isRequired,
  newRelease: PropTypes.array.isRequired,
  kidFriendly: PropTypes.array.isRequired,
  partyGames: PropTypes.array.isRequired
}