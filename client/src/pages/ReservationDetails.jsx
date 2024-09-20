import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ReservationDetails = () => {
  const { reservationId } = useParams();
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchReservationDetails = async () => {
      try {
        const response = await axios.get(`/api/reservations/${reservationId}`, { withCredentials: true });
        setReservation(response.data);
        setLoading(false);
      } catch {
        setError('Rezervasyon detayları alınırken bir hata oluştu.');
        setLoading(false);
      }
    };

    fetchReservationDetails();
  }, [reservationId]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-400 to-blue-500 text-white text-2xl">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-600 text-2xl">{error}</div>;
  }

  if (!reservation) {
    return <div className="flex justify-center items-center min-h-screen text-red-600 text-2xl">Rezervasyon bulunamadı.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-900 to-indigo-500 p-10 text-white">
   
      <div className="flex flex-col items-center mb-16">
        <h1 className="text-5xl font-bold mb-4 tracking-wider shadow-lg p-4 bg-opacity-50 bg-black rounded-lg">
          Rezervasyon Detayları
        </h1>
        <p className="text-lg font-light tracking-wide shadow-lg p-2 bg-opacity-40 bg-black rounded">
          Rezervasyon ID: {reservationId}
        </p>
      </div>

   
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
    
        <div className="p-10 bg-opacity-40 bg-black rounded-2xl shadow-2xl hover:shadow-lg transition-all duration-300">
          <h2 className="text-3xl font-extrabold mb-6 tracking-tight">Otel Bilgileri</h2>
          <div className="space-y-4">
            <p className="text-xl">
              <span className="font-semibold text-yellow-300">Otel Adı:</span> {reservation.hotelName}
            </p>
            <p className="text-xl">
              <span className="font-semibold text-yellow-300">Giriş Tarihi:</span> {new Date(reservation.checkInDate).toLocaleDateString()}
            </p>
            <p className="text-xl">
              <span className="font-semibold text-yellow-300">Çıkış Tarihi:</span> {new Date(reservation.checkOutDate).toLocaleDateString()}
            </p>
            <p className="text-xl">
              <span className="font-semibold text-yellow-300">Yetişkin Sayısı:</span> {reservation.numberOfGuests}
            </p>
            <p className="text-xl">
              <span className="font-semibold text-yellow-300">Gecelik Fiyat:</span> {reservation.pricePerNight} ₺
            </p>
            <p className="text-xl">
              <span className="font-semibold text-yellow-300">Toplam Fiyat:</span> {reservation.totalPrice} ₺
            </p>
          </div>
        </div>

      
        <div className="p-10 bg-opacity-40 bg-black rounded-2xl shadow-2xl hover:shadow-lg transition-all duration-300">
          <h2 className="text-3xl font-extrabold mb-6 tracking-tight">Rezervasyon Durumu</h2>
          <div className="space-y-4">
            <p className={`text-2xl font-bold ${reservation.status === 'confirmed' ? 'text-green-400' : 'text-red-500'}`}>
              {reservation.status === 'confirmed' ? 'Onaylandı' : 'Beklemede'}
            </p>
            <div className="mt-6">
              <p className="text-lg text-gray-300">
                Rezervasyon detaylarıyla ilgili sorularınız varsa müşteri hizmetlerine ulaşın.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationDetails;
