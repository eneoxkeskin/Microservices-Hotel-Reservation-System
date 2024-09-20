import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const HotelUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [hotelData, setHotelData] = useState({
    name: '',
    city: '',
    country: '',
    description: '',
    pricePerNight: '',
    starRating: 1,
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {

    const fetchHotelDetails = async () => {
      try {
        const response = await axios.get(`/api/hotels/${id}`);
        setHotelData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching hotel details:', error);
        setMessage('Error loading hotel data');
        setLoading(false);
      }
    };

    fetchHotelDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotelData({ ...hotelData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://microservices.dev/api/hotels/${id}`, hotelData, { withCredentials: true });
      setMessage('Hotel updated successfully!');
      setTimeout(() => navigate('/hotels'), 2000); 
    } catch (error) {
      setMessage('Error updating hotel, please try again.');
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Otel detayları yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-md w-full max-w-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Otel Güncelle</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
      
          <div>
            <label className="block text-sm font-medium text-gray-700">Otel Adı</label>
            <input
              type="text"
              name="name"
              value={hotelData.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
              required
            />
          </div>

    
          <div>
            <label className="block text-sm font-medium text-gray-700">Şehir</label>
            <input
              type="text"
              name="city"
              value={hotelData.city}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
              required
            />
          </div>

     
          <div>
            <label className="block text-sm font-medium text-gray-700">Ülke</label>
            <input
              type="text"
              name="country"
              value={hotelData.country}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
              required
            />
          </div>

      
          <div>
            <label className="block text-sm font-medium text-gray-700">Açıklama</label>
            <textarea
              name="description"
              value={hotelData.description}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
              required
              rows="4"
            ></textarea>
          </div>

       
          <div>
            <label className="block text-sm font-medium text-gray-700">Gecelik Fiyat (₺)</label>
            <input
              type="number"
              name="pricePerNight"
              value={hotelData.pricePerNight}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
              required
            />
          </div>

     
          <div>
            <label className="block text-sm font-medium text-gray-700">Yıldız Değerlendirmesi</label>
            <select
              name="starRating"
              value={hotelData.starRating}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
              required
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <option key={star} value={star}>
                  {star} Star{star > 1 && 's'}
                </option>
              ))}
            </select>
          </div>

      
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-blue-700 transition"
            >
              Otel Güncelle
            </button>
          </div>

       
          {message && (
            <div className="mt-4 text-center text-lg">
              <span className={message.includes('successfully') ? 'text-green-500' : 'text-red-500'}>{message}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default HotelUpdate;
