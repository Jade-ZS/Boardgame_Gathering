import './SearchResult.css';
import Card from './Card';
import { useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types'

export default function SearchResult({ games }) {
  const [searchParams] = useSearchParams(); 
  const keyword = searchParams.get('name');
  const searchResults = games.filter(game => game.name.toLowerCase().includes(keyword.toLowerCase()));
  const resultCards = searchResults.map(game => <Card imgSrc={game['image_url']} name={game.name} id={game.id} key={game.id}/>);

  return (
    <div className='search-result'>
      {searchResults.length ? resultCards : <p>Sorry, no matching game was found. Please try a different game name...</p>}
    </div>
  )
}

SearchResult.propTypes = {
  games: PropTypes.array.isRequired,
}