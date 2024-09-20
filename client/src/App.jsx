import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import AddHotel from './pages/AddHotel';
import ProtectRoute from './components/ProtectRoute';
import HotelUpdate from './pages/HotelUpdate';
import HotelList from './pages/HotelList';
import SearchResults from './pages/SearchResults';
import HotelDetails from './pages/HotelDetails';
import ReservationDetails from './pages/ReservationDetails';
import Header from './components/Header';
import Footer from './components/Footer';


export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
     
        <Route path="/hotels/:id" element={<HotelDetails />} />
        <Route path="/" element={<Home />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

     
        <Route path="/reservations/:reservationId" element={<ReservationDetails />} />



        <Route 
          path="/add-hotel" 
          element={
            <ProtectRoute allowedRoles={['admin']}>
              <AddHotel />
            </ProtectRoute>
          } 
        />

        <Route 
          path="/update-hotel/:id" 
          element={
            <ProtectRoute allowedRoles={['admin']}>
              <HotelUpdate />
            </ProtectRoute>
          } 
        />

        <Route 
          path="/list-hotels" 
          element={
            <ProtectRoute allowedRoles={['admin']}>
              <HotelList />
            </ProtectRoute>
          } 
        />
      </Routes>
      <Footer />
    </Router>
  );
}
