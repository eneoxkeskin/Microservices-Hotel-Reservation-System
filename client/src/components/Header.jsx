import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { FaChevronDown} from 'react-icons/fa'; 

const Header = () => {
  const [user, setUser] = useState(null); 
  const [showMenu, setShowMenu] = useState(false); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/users/profile', { withCredentials: true });
        setUser(response.data);
      } catch (error) {
        console.error('Kullanıcı verisi alınamadı:', error);
      }
    };

    fetchUserData();
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = async () => {
    try {
      await axios.post('/api/users/logout', {}, { withCredentials: true });
      setUser(null); 
      navigate('/');
    } catch (error) {
      console.error('Çıkış yapılamadı:', error);
    }
  };

  return (
    <header className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center px-6">
      
        <div className="flex items-center space-x-6">
          <a href="/" className="text-3xl font-bold tracking-wide">
            Eneox<span className="text-yellow-400">.com</span>
          </a>

         
          <nav className="hidden md:flex space-x-8 text-base font-medium">
            <a href="/stays" className="hover:text-yellow-400 transition duration-300">Konaklamalar</a>
            <a href="/flights" className="hover:text-yellow-400 transition duration-300">Uçuşlar</a>
            <a href="/car-rental" className="hover:text-yellow-400 transition duration-300">Araba Kiralama</a>
            <a href="/tours" className="hover:text-yellow-400 transition duration-300">Turlar</a>
            {user && user.role === 'admin' && (
              <>
                <a href="/add-hotel" className="hover:text-yellow-400 transition duration-300">Hotel Ekle</a>
                <a href="/list-hotels" className="hover:text-yellow-400 transition duration-300">Hotel Listele</a>
              </>
            )}
          </nav>
        </div>

      
        <div className="flex items-center space-x-6 text-sm font-light">
          {user ? (
            <div className="relative">
              <button
                onClick={toggleMenu}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <div className="flex items-center bg-yellow-400 text-blue-900 font-bold rounded-full w-8 h-8 justify-center">
                  {user.firstName.charAt(0)}
                </div>
                <div className="text-left hidden md:block">
                  <p className="text-sm font-semibold">{`${user.firstName} ${user.lastName}`}</p>
                  
                </div>
                <FaChevronDown className="text-yellow-300" />
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white text-black rounded-lg shadow-lg z-50">
                  <ul className="p-2">
                    <li className="px-4 py-2 hover:bg-gray-100">
                      <a href="/account-settings">Hesap ayarları</a>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100">
                      <a href="/reservations">Rezervasyonlar ve Seyahatler</a>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100">
                      <a href="/genius-program">Genius sadakat programı</a>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100">
                      <a href="/rewards">Ödüller ve Cüzdan</a>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100">
                      <a href="/reviews">Değerlendirmeler</a>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100">
                      <a href="/saved">Kaydedilenler</a>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 text-red-600">
                      <button onClick={handleLogout}>Çıkış yap</button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="flex space-x-4">
              <a href="/login" className="hover:underline">Giriş Yap</a>
              <a href="/register" className="hover:underline">Kayıt Ol</a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
