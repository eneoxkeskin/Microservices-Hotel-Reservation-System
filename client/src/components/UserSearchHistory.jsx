import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiSearch, FiClock } from 'react-icons/fi';

const UserSearchHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get('/api/hotels/user-searches');
        setHistory(response.data);
        setLoading(false);
      } catch {
        
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="h-[30vh] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-gray-600"></div>
          <p className="mt-4 text-lg text-gray-700 font-semibold">
            Geçmiş Aramalar yükleniyor...
          </p>
        </div>
      </div>
    );
  }


  if (history.length === 0) {
    return null;
  }

  return (
    <div className="p-4">
      <div className="max-w-6xl mx-auto">
        {history.length > 0 && (
          <h1 className="text-2xl font-extrabold text-center mb-6 text-gray-800">
            Geçmiş Aramalar
          </h1>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {history.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-3 rounded-lg shadow-md flex flex-col items-center justify-center transform transition duration-300 hover:scale-105 hover:shadow-xl"
            >
              <FiSearch className="text-xl text-gray-600 mb-2" />
              <p className="text-sm font-semibold text-gray-800">
                {item.text}
              </p>
              <div className="flex items-center space-x-1 text-gray-600 mt-1">
                <FiClock />
                <p className="text-xs">
                  {new Date(item.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserSearchHistory;
