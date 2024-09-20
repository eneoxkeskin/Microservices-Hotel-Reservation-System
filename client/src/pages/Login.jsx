import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const Login = () => {
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
      const response = await axios.post('/api/users/login', {
        email,
        password,
      });

      setSuccess('Giriş başarılı!');
      setLoading(false);


      setTimeout(() => {
        navigate('/'); 
      }, 2000);

      console.log('Giriş başarılı:', response.data);
    } catch (err) {
      setLoading(false);
      setError('Giriş başarısız. Lütfen tekrar deneyin.');
      console.error('Giriş hatası:', err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 to-blue-500 p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md transform transition-all hover:scale-105 duration-300">
        <h2 className="text-4xl font-bold text-center text-indigo-900 mb-8">
          Hoş Geldiniz
        </h2>

    
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-indigo-900 font-semibold">
              E-posta
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 mt-2 border border-indigo-400 rounded-lg focus:ring-4 focus:ring-indigo-300 focus:outline-none text-indigo-900"
              placeholder="E-posta adresinizi girin"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-indigo-900 font-semibold">
              Şifre
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 mt-2 border border-indigo-400 rounded-lg focus:ring-4 focus:ring-indigo-300 focus:outline-none text-indigo-900"
              placeholder="Şifrenizi girin"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-3 rounded-lg font-bold text-white tracking-wide transition-all duration-300 ${
              loading ? 'bg-gray-400' : 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'
            }`}
          >
            {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-indigo-900">
            Henüz hesabınız yok mu?{' '}
            <a href="/register" className="text-indigo-600 font-semibold hover:underline">
              Kayıt Olun
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
