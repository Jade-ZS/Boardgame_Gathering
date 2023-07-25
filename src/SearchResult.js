import './SearchResult.css';
import Card from './Card';
import { useSearchParams } from 'react-router-dom';

export default function SearchResult({getSearchResults, games}) {
  const [searchParams] = useSearchParams(); 
  const keyword = searchParams.get('name');

  const searchResults = games.filter(game => game.name.toLowerCase().includes(keyword.toLowerCase()));
  getSearchResults(searchResults);


  return (
    <div className='search-result'>
      {searchResults.map(game => <Card imgSrc={game['image_url']} name={game.name} id={game.id} key={game.id}/>)}
    </div>
  )
}