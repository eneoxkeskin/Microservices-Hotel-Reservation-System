import { redisSubscriber } from "../config/redisClient.js";
import Reservation from "../models/Reservation.js";


export const subscribeReservationChannel = async () => {
    try {

      await redisSubscriber.subscribe('reservationChannel', async (message) => {
        console.log('Received reservation data:', message);
  

        const reservationData = JSON.parse(message);
  
        try {

          const newReservation = new Reservation({
            userId: reservationData.userId,
            hotelId: reservationData.hotelId,
            hotelName: reservationData.hotelName,
            checkInDate: reservationData.checkInDate,
            checkOutDate: reservationData.checkOutDate,
            numberOfGuests: reservationData.numberOfGuests,
            pricePerNight: reservationData.pricePerNight,
            totalPrice: reservationData.totalPrice,
          });
  

          const savedReservation = await newReservation.save();
          console.log('Reservation saved to database with ID:', savedReservation._id);
  
        } catch (error) {
          console.error('Error saving reservation to database:', error);
        }
      });
    } catch (error) {
      console.error("Error initializing Redis subscription:", error);
    }
  };


export const getLastReservation = async (req, res) => {
  try {

    const lastReservation = await Reservation.findOne().sort({ createdAt: -1 });

    if (!lastReservation) {
      return res.status(404).json({ message: "No reservations found" });
    }


    res.status(200).json({
      message: "Last reservation retrieved successfully",
      data: {
        reservationId: lastReservation._id,
        ...lastReservation._doc, 
      },
    });
  } catch (error) {
    console.error("Error retrieving last reservation:", error);
    res.status(500).json({ message: "Error retrieving reservation" });
  }
};


export const getReservationById = async (req, res) => {
    const { reservationId } = req.params;
  
    try {
      const reservation = await Reservation.findById(reservationId);
      if (!reservation) {
        return res.status(404).json({ message: "Rezervasyon bulunamadı" });
      }
      res.status(200).json(reservation);
    } catch (error) {
      console.error("Error fetching reservation:", error);
      res.status(500).json({ message: "Rezervasyon detayları alınırken hata oluştu" });
    }
  };
  