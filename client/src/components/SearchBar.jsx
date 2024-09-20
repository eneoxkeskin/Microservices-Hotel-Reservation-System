import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash/debounce';
import { FaSearch } from 'react-icons/fa'; 

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {

    const debouncedFetchSuggestions = debounce(async (query) => {
      if (query.trim().length === 0) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      setError('');
      try {
        const response = await axios.get('/api/hotels', {
          params: { text: query },
          withCredentials: true,
        });

        setSuggestions(response.data);
      } catch (error) {
        setError('Error fetching suggestions');
        console.error(error);
      }
      setLoading(false);
    }, 300);


    debouncedFetchSuggestions(searchText);


    return () => debouncedFetchSuggestions.cancel();
  }, [searchText]); 

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSuggestionClick = async (hotel) => {
    const hotelId = hotel._id;
    if (!hotelId) {
      console.error('Hotel ID is missing');
      return;
    }

    setSearchText(hotel.name);

    try {
      await axios.post(`/api/hotels/increment-count/${hotelId}`);
      await axios.post('/api/hotels/save-search', {
        text: hotel.name,
        hotelId: hotelId,
      });

      navigate(`/hotels/${hotelId}`);
    } catch (error) {
      console.error('Error incrementing hotel count or saving search query:', error);
    }
  };

  return (
    <div className="relative w-full max-w-xl mx-auto mt-10">
      <div className="flex items-center bg-white rounded-full shadow-lg p-2 border border-gray-300 transition duration-300 focus-within:shadow-xl">
        <input
          type="text"
          placeholder="Otelleri isim, şehir, ülkeye göre ara..."
          value={searchText}
          onChange={handleSearchChange}
          className="flex-grow p-3 text-gray-900 bg-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="text-gray-500 p-2 focus:outline-none">
          <FaSearch className="h-6 w-6" /> 
        </button>
      </div>

      {loading && (
        <div className="absolute inset-x-0 mt-2 bg-white border border-gray-200 shadow-lg rounded-lg p-3 flex items-center space-x-2">
          <div className="spinner-border animate-spin inline-block w-5 h-5 border-t-2 border-b-2 border-gray-400 rounded-full"></div>
          <span className="text-gray-600">Loading...</span>
        </div>
      )}

      {suggestions.length > 0 && (
        <div className="absolute inset-x-0 mt-2 bg-white border border-gray-200 shadow-lg rounded-lg z-50">
          <ul className="divide-y divide-gray-200">
            {suggestions.map((hotel) => (
              <li
                key={hotel._id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition ease-in-out duration-200"
                onClick={() => handleSuggestionClick(hotel)}
              >
                <span className="font-semibold text-gray-800">{hotel.name}</span>, {hotel.city}, {hotel.country}
              </li>
            ))}
          </ul>
        </div>
      )}

      {error && (
        <div className="absolute inset-x-0 mt-2 bg-white border border-red-500 shadow-lg rounded-lg p-3 text-red-600">
          {error}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
