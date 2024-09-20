import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(''); 
  const [success, setSuccess] = useState(''); 

  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('/api/users/register', {
        firstName,
        lastName,
        email,
        password,
      });

      setSuccess('Kayıt başarılı!');
      setLoading(false);

 
      setTimeout(() => {
        navigate('/login'); 
      }, 2000);

      console.log('Kayıt başarılı:', response.data);
    } catch (err) {
      setLoading(false);
      setError('Kayıt işlemi başarısız. Lütfen tekrar deneyin.');
      console.error('Kayıt hatası:', err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-500 to-yellow-500 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md transform transition-all hover:scale-105 duration-300">
        <h2 className="text-4xl font-bold text-center text-pink-700 mb-8">
          Hesap Oluştur
        </h2>

      
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="firstName" className="block text-pink-700 font-semibold">
              Ad
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-3 mt-2 border border-pink-300 rounded-lg focus:ring-4 focus:ring-pink-300 focus:outline-none"
              placeholder="Adınızı girin"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="lastName" className="block text-pink-700 font-semibold">
              Soyad
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-3 mt-2 border border-pink-300 rounded-lg focus:ring-4 focus:ring-pink-300 focus:outline-none"
              placeholder="Soyadınızı girin"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-pink-700 font-semibold">
              E-posta
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 mt-2 border border-pink-300 rounded-lg focus:ring-4 focus:ring-pink-300 focus:outline-none"
              placeholder="E-posta adresinizi girin"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-pink-700 font-semibold">
              Şifre
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 mt-2 border border-pink-300 rounded-lg focus:ring-4 focus:ring-pink-300 focus:outline-none"
              placeholder="Şifrenizi girin"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-3 rounded-lg font-bold text-white tracking-wide transition-all duration-300 ${
              loading ? 'bg-gray-400' : 'bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600'
            }`}
          >
            {loading ? 'Kaydediliyor...' : 'Kayıt Ol'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-pink-700">
            Zaten bir hesabınız var mı?{' '}
            <a href="/login" className="text-pink-500 font-semibold hover:underline">
              Giriş Yapın
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
