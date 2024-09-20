import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const SearchResults = () => {
  const [hotels, setHotels] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams(); 
  const searchText = searchParams.get('text'); 

  useEffect(() => {
    if (!searchText) {
      setError('Search query is missing');
      setLoading(false);
      return;
    }

    const fetchSearchResults = async () => {
      try {
        const response = await axios.get('/api/hotels/search', {
          params: { text: searchText }, 
          withCredentials: true, 
        });
        setHotels(response.data);
      } catch (err) {
        setError('Error fetching search results');
        console.error('Error:', err); 
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchText]);


  if (loading) {
    return <div>Loading search results...</div>;
  }


  if (error) {
    return <div>{error}</div>;
  }


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Search Results for &quot;{searchText}&quot;</h1>
      {hotels.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {hotels.map((hotel) => (
            <div key={hotel._id} className="border rounded-lg p-4 shadow-md">
              <h2 className="text-xl font-semibold">{hotel.name}</h2>
              <p>{hotel.city}, {hotel.country}</p>
              <p>{hotel.description}</p>
              <p>Price per night: ${hotel.pricePerNight}</p>
              <p>Rating: {hotel.starRating} / 5</p>
            </div>
          ))}
        </div>
      ) : (
        <div>No hotels found matching &quot;{searchText}&quot;.</div>
      )}
    </div>
  );
};

export default SearchResults;
