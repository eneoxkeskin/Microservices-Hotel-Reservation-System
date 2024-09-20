import { useState } from 'react';
import PopularHotels from '../components/PopularHotels';
import PropertyTypes from '../components/PropertyTypes';
import PopularDestinations from '../components/PopularDestinations';
import Recommendations from '../components/Recommendations';
import LastMinuteDeals from '../components/LastMinuteDeals';
import AccommodationListings from '../components/AccommodationListings';
import Banner from '../components/Banner';
import SearchBar from '../components/SearchBar';
import UserSearchHistory from '../components/UserSearchHistory';

const Home = () => {
  const [activePage, setActivePage] = useState('all'); 

  const renderContent = () => {
    switch (activePage) {
      case 'popularHotels':
        return <PopularHotels />;
      case 'propertyTypes':
        return <PropertyTypes />;
      case 'popularDestinations':
        return <PopularDestinations />;
      case 'recommendations':
        return <Recommendations />;
      case 'lastMinuteDeals':
        return <LastMinuteDeals />;
      case 'accommodationListings':
        return <AccommodationListings />;
      case 'all':
      default:
        return (
          <>
            <PopularHotels />
            <PropertyTypes />
            <PopularDestinations />
            <Recommendations />
            <LastMinuteDeals />
            <AccommodationListings />
          </>
        );
    }
  };

  return (
    <div className="bg-gray-50">
     
      <Banner />
      <SearchBar />
      <UserSearchHistory />
      <div className="container mx-auto my-12">
        <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-900">Keşfet</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 text-center">
          <button
            onClick={() => setActivePage('all')}
            className={`p-4 ${activePage === 'all' ? 'bg-[#00224f] text-white shadow-lg' : 'bg-transparent border border-[#00224f] text-[#00224f]'} rounded-full hover:bg-[#00224f] hover:text-white transition-all duration-300 transform hover:scale-105`}
          >
            Hepsi
          </button>
          <button
            onClick={() => setActivePage('popularHotels')}
            className={`p-4 ${activePage === 'popularHotels' ? 'bg-[#00224f] text-white shadow-lg' : 'bg-transparent border border-[#00224f] text-[#00224f]'} rounded-full hover:bg-[#00224f] hover:text-white transition-all duration-300 transform hover:scale-105`}
          >
            Popüler Oteller
          </button>
          <button
            onClick={() => setActivePage('propertyTypes')}
            className={`p-4 ${activePage === 'propertyTypes' ? 'bg-[#00224f] text-white shadow-lg' : 'bg-transparent border border-[#00224f] text-[#00224f]'} rounded-full hover:bg-[#00224f] hover:text-white transition-all duration-300 transform hover:scale-105`}
          >
            Konaklama Türleri
          </button>
          <button
            onClick={() => setActivePage('popularDestinations')}
            className={`p-4 ${activePage === 'popularDestinations' ? 'bg-[#00224f] text-white shadow-lg' : 'bg-transparent border border-[#00224f] text-[#00224f]'} rounded-full hover:bg-[#00224f] hover:text-white transition-all duration-300 transform hover:scale-105`}
          >
            Popüler Destinasyonlar
          </button>
          <button
            onClick={() => setActivePage('recommendations')}
            className={`p-4 ${activePage === 'recommendations' ? 'bg-[#00224f] text-white shadow-lg' : 'bg-transparent border border-[#00224f] text-[#00224f]'} rounded-full hover:bg-[#00224f] hover:text-white transition-all duration-300 transform hover:scale-105`}
          >
            Öneriler
          </button>
          <button
            onClick={() => setActivePage('lastMinuteDeals')}
            className={`p-4 ${activePage === 'lastMinuteDeals' ? 'bg-[#00224f] text-white shadow-lg' : 'bg-transparent border border-[#00224f] text-[#00224f]'} rounded-full hover:bg-[#00224f] hover:text-white transition-all duration-300 transform hover:scale-105`}
          >
            Son Dakika Fırsatları
          </button>
          <button
            onClick={() => setActivePage('accommodationListings')}
            className={`p-4 ${activePage === 'accommodationListings' ? 'bg-[#00224f] text-white shadow-lg' : 'bg-transparent border border-[#00224f] text-[#00224f]'} rounded-full hover:bg-[#00224f] hover:text-white transition-all duration-300 transform hover:scale-105`}
          >
            Konaklama Listeleri
          </button>
        </div>
      </div>

  
      <div className="container mx-auto my-12">
        {renderContent()}
      </div>

     
    </div>
  );
};

export default Home;
