import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  const fetchAllHotels = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`/api/hotels/all`);
      setHotels(response.data);
    } catch {
      setError('Otelleri çekerken bir hata oluştu. Lütfen tekrar deneyin.');
    }
    setLoading(false);
  }, []);


  const fetchHotels = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`/api/hotels`, {
        params: { text: searchText },
      });
      setHotels(response.data);
    } catch {
      setError('Oteller aranırken bir hata oluştu. Lütfen tekrar deneyin.');
    }
    setLoading(false);
  }, [searchText]); 


  useEffect(() => {
    fetchAllHotels();
  }, [fetchAllHotels]); 

 
  useEffect(() => {
    if (searchText.length >= 2) {
      fetchHotels();
    } else if (searchText === '') {
      fetchAllHotels();
    }
  }, [searchText, fetchHotels, fetchAllHotels]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
  };

  const handleDelete = async (hotelId) => {
    if (window.confirm('Bu oteli silmek istediğinizden emin misiniz?')) {
      try {
        await axios.delete(`/api/hotels/${hotelId}`);
        setHotels(hotels.filter((hotel) => hotel._id !== hotelId));
      } catch {
        setError('Oteli silerken bir hata oluştu. Lütfen tekrar deneyin.');
      }
    }
  };

  const handleUpdate = (hotelId) => {
    window.location.href = `/update-hotel/${hotelId}`;
  };

  const renderStars = (starRating) => {
    return '★'.repeat(starRating) + '☆'.repeat(5 - starRating);
  };

  return (
    <>
      <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
        <div className="w-full max-w-2xl p-6">
          <input
            type="text"
            placeholder="Lüks otelleri arayın..."
            className="w-full p-4 text-lg bg-transparent border-b border-lime-200 focus:outline-none focus:ring-0 focus:border-lime-400 text-white placeholder-lime-300"
            value={searchText}
            onChange={handleSearchChange}
          />
        </div>

        <div className="w-full overflow-hidden">
          {loading && (
            <div className="text-center py-6 text-2xl font-bold text-gray-400 animate-pulse">
              Lüks oteller aranıyor...
            </div>
          )}

          {error && (
            <div className="text-center py-6 text-xl font-semibold text-red-500">
              {error}
            </div>
          )}

          {!loading && !error && hotels.length > 0 && (
            <div className="flex flex-col items-center w-full">
              {hotels.map((hotel) => (
                <div
                  key={hotel._id}
                  className="relative w-full h-[60vh] flex items-center justify-center bg-cover bg-center my-8 shadow-lg rounded-lg"
                  style={{
                    backgroundImage: hotel.defaultImage
                      ? `url(${hotel.defaultImage})`
                      : `url('/path/to/default-image.jpg')`, 
                  }}
                >
                  <div className="absolute inset-0 bg-black opacity-60 rounded-lg"></div>
                  <div className="relative z-10 text-center px-8 py-10">
                    <h3 className="text-4xl font-extrabold text-lime-100">{hotel.name}</h3>
                    <p className="mt-4 text-lg text-lime-200">
                      {hotel.city}, {hotel.country}
                    </p>
                    <div className="text-lg text-lime-200">
                      {renderStars(hotel.starRating)}
                    </div>
                    <p className="mt-2 text-xl text-lime-200">
                      {hotel.description || 'Hotelimize Bekleriz!'}
                    </p>
                    <p className="mt-6 text-3xl font-semibold text-lime-100">
                      {hotel.pricePerNight ? `₺${hotel.pricePerNight} / gece` : 'Fiyat bilgisi mevcut değil'}
                    </p>
                    <div className="mt-8 flex justify-center space-x-6">
                      <button
                        onClick={() => handleUpdate(hotel._id)}
                        className="px-6 py-3 bg-lime-100 text-black font-bold rounded-full hover:bg-lime-200 transition-all duration-300"
                      >
                        Güncelle
                      </button>
                      <button
                        onClick={() => handleDelete(hotel._id)}
                        className="px-6 py-3 bg-transparent text-lime-100 font-bold border border-lime-100 rounded-full hover:border-lime-200 hover:text-lime-200 transition-all duration-300"
                      >
                        Sil
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HotelList;
