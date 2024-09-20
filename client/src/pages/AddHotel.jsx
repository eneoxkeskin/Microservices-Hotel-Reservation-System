import { useState } from 'react';
import axios from 'axios';

const AddHotel = () => {
  const [hotelData, setHotelData] = useState({
    name: '',
    city: '',
    country: '',
    description: '',
    pricePerNight: '',
    starRating: 1,
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotelData({ ...hotelData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/hotels', hotelData); 
      setMessage('Hotel added successfully!');
      setHotelData({
        name: '',
        city: '',
        country: '',
        description: '',
        pricePerNight: '',
        starRating: 1,
      });
    } catch {
      setMessage('Error adding hotel, please try again.');
    }
  };

  return (
    <>
     
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-indigo-200">
        <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-lg">
          <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-800">Yeni Bir Otel Ekle</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
      
            <div>
              <label className="block text-lg font-medium text-gray-700">Otel Adı</label>
              <input
                type="text"
                name="name"
                value={hotelData.name}
                onChange={handleChange}
                className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3"
                required
              />
            </div>

       
            <div>
              <label className="block text-lg font-medium text-gray-700">Şehir</label>
              <input
                type="text"
                name="city"
                value={hotelData.city}
                onChange={handleChange}
                className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3"
                required
              />
            </div>

          
            <div>
              <label className="block text-lg font-medium text-gray-700">Ülke</label>
              <input
                type="text"
                name="country"
                value={hotelData.country}
                onChange={handleChange}
                className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3"
                required
              />
            </div>

         
            <div>
              <label className="block text-lg font-medium text-gray-700">Açıklama</label>
              <textarea
                name="description"
                value={hotelData.description}
                onChange={handleChange}
                className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3"
                required
                rows="4"
              ></textarea>
            </div>

       
            <div>
              <label className="block text-lg font-medium text-gray-700">Gecelik Fiyat (₺)</label>
              <input
                type="number"
                name="pricePerNight"
                value={hotelData.pricePerNight}
                onChange={handleChange}
                className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3"
                required
              />
            </div>

       
            <div>
              <label className="block text-lg font-medium text-gray-700">Yıldız Derecelendirmesi</label>
              <select
                name="starRating"
                value={hotelData.starRating}
                onChange={handleChange}
                className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3"
                required
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <option key={star} value={star}>
                    {star} Yıldız
                  </option>
                ))}
              </select>
            </div>

       
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-indigo-700 hover:shadow-lg transition duration-300 transform hover:scale-105"
              >
                Otel Ekle
              </button>
            </div>

       
            {message && (
              <div className="mt-4 text-center text-lg">
                <span className={message.includes('successfully') ? 'text-green-500' : 'text-red-500'}>
                  {message}
                </span>
              </div>
            )}
          </form>
        </div>
      </div>
      
    </>
  );
};

export default AddHotel;
