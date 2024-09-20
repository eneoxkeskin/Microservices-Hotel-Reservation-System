import Hotel from '../models/Hotel.js';
import SearchQuery from '../models/SearchQuery.js';
import esClient from '../config/elasticsearch.js';
import redisClient from '../config/redisClient.js'; 
import ViewedHotels from '../models/ViewedHotels.js';
import mongoose from 'mongoose';


export const createHotel = async (req, res) => {
  const { name, city, country, description, pricePerNight, starRating } = req.body;

  if (!name || !city || !country || !pricePerNight || !starRating) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  try {

    const newHotel = new Hotel({
      name,
      city,
      country,
      description,
      pricePerNight,
      starRating,
    });

    const savedHotel = await newHotel.save();


    await esClient.index({
      index: 'hotels',
      id: savedHotel._id.toString(),
      body: {
        name: savedHotel.name,
        city: savedHotel.city,
        country: savedHotel.country,
        description: savedHotel.description,
        pricePerNight: savedHotel.pricePerNight,
        starRating: savedHotel.starRating,
        defaultImage: savedHotel.defaultImage,
      },
    });

    res.status(201).json({ message: 'Hotel created successfully', hotel: savedHotel });
  } catch (error) {
    console.error('Error creating hotel:', error);
    res.status(500).json({ message: 'Error creating hotel' });
  }
};



export const listHotels = async (req, res) => {
  const { query } = req.query; 

  try {
  
    const esResult = await esClient.search({
      index: 'hotels',
      body: {
        suggest: {
          'hotel-suggest': {
            prefix: query,
            completion: {
              field: 'name',
              fuzzy: {
                fuzziness: 2, 
              },
            },
          },
        },
      },
    });

  
    const hotelSuggestions = esResult.suggest['hotel-suggest'][0].options.map(option => ({
      _id: option._id || option._source._id, 
      name: option._source.name,
      city: option._source.city,
      country: option._source.country,
      pricePerNight: option._source.pricePerNight,
      description: option._source.description,
      defaultImage: option._source.defaultImage, 
    }));

 
    res.status(200).json(hotelSuggestions);
  } catch (error) {
    console.error('Error listing hotels:', error);
    res.status(500).json({ message: 'Error listing hotels' });
  }
};




export const updateHotel = async (req, res) => {
  const hotelId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(hotelId)) {
    return res.status(400).json({ message: 'Invalid hotel ID' });
  }

  const { name, city, country, description, pricePerNight, starRating, defaultImage } = req.body;

  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      hotelId,
      { name, city, country, description, pricePerNight, starRating, defaultImage },
      { new: true }
    );

    if (!updatedHotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

 
    await esClient.update({
      index: 'hotels',
      id: hotelId,
      body: {
        doc: {
          name: updatedHotel.name,
          city: updatedHotel.city,
          country: updatedHotel.country,
          description: updatedHotel.description,
          pricePerNight: updatedHotel.pricePerNight,
          starRating: updatedHotel.starRating,
          defaultImage: updatedHotel.defaultImage, 
        },
      },
    });

    res.status(200).json({ message: 'Hotel updated successfully', hotel: updatedHotel });
  } catch (error) {
    console.error('Error updating hotel:', error);
    res.status(500).json({ message: 'Error updating hotel' });
  }
};




export const deleteHotel = async (req, res) => {
  const hotelId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(hotelId)) {
    return res.status(400).json({ message: 'Invalid hotel ID' });
  }

  try {
    const deletedHotel = await Hotel.findByIdAndDelete(hotelId);

    if (!deletedHotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }


    await esClient.delete({
      index: 'hotels',
      id: hotelId,
    });

    res.status(200).json({ message: 'Hotel deleted successfully' });
  } catch (error) {
    console.error('Error deleting hotel:', error);
    res.status(500).json({ message: 'Error deleting hotel' });
  }
};



export const searchHotels = async (req, res) => {
  const { text } = req.query;

  console.log('Search query:', text); 

  try {
    const lowercaseText = text.toLowerCase();
    const esResult = await esClient.search({
      index: 'hotels',
      body: {
        query: {
          bool: {
            should: [
              {
                prefix: {
                  name: lowercaseText 
                }
              },
              {
                prefix: {
                  city: lowercaseText  
                }
              },
              {
                prefix: {
                  country: lowercaseText  
                }
              }
            ]
          }
        }
      }
    });

    console.log('ES Results:', esResult.hits.hits); 

  
    const hotels = esResult.hits.hits.map(hit => ({
      _id: hit._id,
      ...hit._source 
    }));

    res.status(200).json(hotels);
  } catch (error) {
    console.error('Error searching hotels:', error);
    res.status(500).json({ message: 'Error searching hotels' });
  }
};




export const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    if (!hotels.length) {
      return res.status(404).json({ message: 'No hotels found' });
    }
    res.status(200).json(hotels);
  } catch (error) {
    console.error('Error getting all hotels:', error);
    res.status(500).json({ message: 'Error fetching hotels' });
  }
};


export const saveSearchQuery = async (req, res) => {
  const { text} = req.body;
  const userId = req.user.userId;
  if (!text) {
    return res.status(400).json({ error: 'Search text is required' });
  }

  try {
    const newSearchQuery = new SearchQuery({
      text,
      userId,
      
    });

    await newSearchQuery.save();
    res.status(201).json({ message: 'Search query saved successfully' });
  } catch (error) {
    console.error('Error saving search query:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUserSearchQueries = async (req, res) => {
  const userId = req.user.userId;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {

    const searchQueries = await SearchQuery.find({ userId })
      .sort({ date: -1 }) 
      .limit(5);

    res.status(200).json(searchQueries);
  } catch (error) {
    console.error('Error fetching user search queries:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const getAllSearchQueries = async (req, res) => {
  try {
    const searchQueries = await SearchQuery.find().sort({ date: -1 });
    res.status(200).json(searchQueries);
  } catch (error) {
    console.error('Error fetching all search queries:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createReservation = async (req, res) => {
  const { hotelId, checkInDate, checkOutDate, numberOfGuests } = req.body;


  if (!hotelId || !checkInDate || !checkOutDate || !numberOfGuests) {
    return res.status(400).json({ message: 'Tüm alanlar doldurulmalıdır' });
  }

  const userId = req.user.userId;

  try {
  
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ message: 'Otel bulunamadı' });
    }

  
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const numberOfNights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

  
    const totalPrice = numberOfNights * hotel.pricePerNight;

   
    const reservationData = JSON.stringify({
      userId, 
      hotelId,
      hotelName: hotel.name, 
      checkInDate,
      checkOutDate,
      numberOfGuests,
      pricePerNight: hotel.pricePerNight, 
      totalPrice, 
    });

  
    redisClient.publish('reservationChannel', reservationData); 

    res.status(200).json({ message: 'Rezervasyon başarılı şekilde yapıldı ve Redis üzerinden publish edildi' });
  } catch (error) {
    console.error('Rezervasyon sırasında bir hata oluştu:', error);
    res.status(500).json({ message: 'Rezervasyon sırasında bir hata oluştu' });
  }
};


export const incrementHotelCount = async (req, res) => {
  try {
    const  userId  = req.user.userId 
    const hotelId = req.params.id;


    const alreadyViewed = await ViewedHotels.findOne({ userId, hotelId });

    if (!alreadyViewed) {

      const hotel = await Hotel.findById(hotelId);
      if (hotel) {
        hotel.count += 1; 
        await hotel.save();

       
        const newView = new ViewedHotels({ userId, hotelId });
        await newView.save();

        res.status(200).json({ message: 'Count incremented', hotel });
      } else {
        res.status(404).json({ message: 'Hotel not found' });
      }
    } else {
      
      res.status(200).json({ message: 'Hotel already viewed', hotelId });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error incrementing count', error });
  }
};

export const getPopularHotels = async (req, res) => {
  try {
   
    const popularHotels = await Hotel.find().sort({ count: -1 }).limit(4); 
    
    res.status(200).json(popularHotels); 
  } catch (error) {
    console.error('Error fetching popular hotels:', error);
    res.status(500).json({ message: 'Error fetching popular hotels', error });
  }
};