import express from 'express';
import { 
  createHotel, 
  getAllHotels, 
  updateHotel, 
  deleteHotel, 
  searchHotels, 
  saveSearchQuery, 
  getUserSearchQueries, 
  getAllSearchQueries, 
  createReservation, 
  incrementHotelCount, 
  getPopularHotels 
} from '../controllers/hotelController.js';
import Hotel from '../models/Hotel.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', createHotel);


router.get('/all', getAllHotels); 
router.get('/popular', getPopularHotels); 


router.get('/', searchHotels);


router.post('/increment-count/:id',protect, incrementHotelCount);


router.post('/save-search',protect, saveSearchQuery);
router.get('/user-searches/',protect, getUserSearchQueries);
router.get('/all-searches', getAllSearchQueries);


router.post('/reservation', protect, createReservation);


router.get('/:id', async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.json(hotel);
  } catch (error) {
    console.error('Error fetching hotel:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


router.put('/:id', updateHotel);
router.delete('/:id', deleteHotel);

export default router;
