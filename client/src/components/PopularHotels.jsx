import { useEffect, useState } from 'react';
import axios from 'axios';

const PopularHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
  
    const fetchPopularHotels = async () => {
      try {
        const response = await axios.get('/api/hotels/popular'); 
        setHotels(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching popular hotels:', error);
        setError('Popüler otelleri getirirken bir hata oluştu');
        setLoading(false);
      }
    };

    fetchPopularHotels();
  }, []);

  if (loading) {
    return <div className="text-center text-2xl py-16 text-blue-500">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="text-center text-2xl py-16 text-red-600">{error}</div>;
  }

  return (
    <div className="popular-hotels my-16 px-4">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Popüler Oteller</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {hotels.map((hotel) => (
          <li
            key={hotel._id}
            className="bg-white shadow-md rounded-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300"
          >
            <div className="relative h-60">
              <img
                src={hotel.defaultImage || 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                alt={hotel.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800">{hotel.name}</h3>
              <p className="text-gray-500">{hotel.city}, {hotel.country}</p>
              <p className="text-gray-400 text-sm mt-2">Aranma sayısı: {hotel.count}</p>
              <button className="mt-4 text-blue-600 font-semibold hover:underline">
                Daha Fazla Bilgi
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularHotels;
