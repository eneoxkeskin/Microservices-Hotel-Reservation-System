import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [reservationData, setReservationData] = useState({
    checkInDate: '',
    checkOutDate: '',
    numberOfGuests: 1,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    setReservationData({
      ...reservationData,
      [e.target.name]: e.target.value,
    });
  };

  const handleReservation = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `/api/hotels/reservation`,
        { hotelId: id, ...reservationData },
        { withCredentials: true }
      );

      const response = await axios.get(`/api/reservations/last-reservation`, { withCredentials: true });
      const { reservationId } = response.data.data;

      if (reservationId) {
        setSuccessMessage("Reservation successfully made!");
        navigate(`/reservations/${reservationId}`);
      } else {
        setError('An error occurred during reservation');
      }
    } catch (error) {
      setError('An error occurred during reservation');
      console.error('Reservation error:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await axios.get(`/api/hotels/${id}`);
        setHotel(response.data);
        setLoading(false);
      } catch {
        setError('An error occurred while fetching hotel details');
        setLoading(false);
      }
    };

    fetchHotelDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center py-10 text-lg">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }

  if (!hotel) {
    return <div className="text-center py-10 text-red-600">Otel bulunamadı.</div>;
  }

  return (
    <>
    <div className="container mx-auto px-6 py-12">

      <div className="relative bg-gradient-to-r from-blue-900 via-indigo-800 to-purple-700 py-24 rounded-lg shadow-lg text-white">
        <div className="absolute inset-0 opacity-30">
          <img
            src="https://plus.unsplash.com/premium_photo-1681582960531-7b5de57fb276?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt={hotel.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-6xl font-extrabold">{hotel.name}</h1>
          <p className="mt-4 text-xl">{hotel.city}, {hotel.country}</p>
          <div className="mt-6">
            <span className="text-lg bg-white text-blue-900 px-4 py-2 rounded-full font-semibold">
              {hotel.pricePerNight} ₺ / gecelik
            </span>
          </div>
        </div>
      </div>

  
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
  
        <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-4xl font-bold mb-6">Otel Hakkında</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">{hotel.description}</p>
          <div className="text-lg font-medium text-gray-800">
            <p>Gecelik Fiyat: <span className="text-blue-600">{hotel.pricePerNight} ₺</span></p>
            <p>Değerlendirme: <span className="text-yellow-500">{hotel.starRating} / 5</span></p>
          </div>
        </div>


        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-4xl font-bold mb-6 text-center">Rezervasyon Yap</h2>
          <form className="space-y-6" onSubmit={handleReservation}>
            <div className="flex flex-col">
              <label className="text-gray-700 mb-2">Giriş Tarihi</label>
              <input
                type="date"
                name="checkInDate"
                value={reservationData.checkInDate}
                onChange={handleInputChange}
                className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 mb-2">Çıkış Tarihi</label>
              <input
                type="date"
                name="checkOutDate"
                value={reservationData.checkOutDate}
                onChange={handleInputChange}
                className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 mb-2">Misafir Sayısı</label>
              <input
                type="number"
                name="numberOfGuests"
                value={reservationData.numberOfGuests}
                onChange={handleInputChange}
                className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                min="1"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg text-xl font-semibold hover:bg-blue-700 transition duration-300 transform hover:scale-105"
            >
              Rezervasyonu Onayla
            </button>
          </form>

          {successMessage && <p className="mt-4 text-green-600">{successMessage}</p>}
        </div>
      </div>
    </div>
    
    </>
  );
};

export default HotelDetails;
