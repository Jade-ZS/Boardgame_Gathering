import './ErrorDisplay.css';
import { Link } from 'react-router-dom';

function ErrorDisplay() {
  return (
    <div className='error-container'>
      <div className='home-button'>
        <Link to="/"><p><span>⌂</span></p></Link>
      </div>
      <img src='https://em-content.zobj.net/source/skype/289/loudly-crying-face_1f62d.png' alt='crying face' className="crying_face"/>
      <h1>Oopsy!</h1>
      <p>Page not found! Please check your url...</p>
    </div>
  )
}

export default ErrorDisplay;



