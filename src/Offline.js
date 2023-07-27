import './Offline.css';
import { useState, useEffect } from 'react';

export default function Offline({offline}) {
  const [clicked, setClicked] = useState(false)

  const handleClose = () => {
    setClicked(true);
  }
  return (
    <div className={`offline ${clicked && 'clicked'} ${!offline && 'hidden'}`}>
      <div className='middle-layer inner'></div>
      <div className={'offline-notification inner'} >
        <span className='close inner' onClick={() => handleClose()}/>
        <h1>You are currently offline.</h1>
        <p>Please check your internet connection to fully enjoy our service.</p>
      </div>
    </div>
  )
}