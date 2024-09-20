import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import connectDatabase from './config/dbConnect.js';
import reservationRoutes from './routes/reservationRoutes.js';
import { subscribeReservationChannel } from './controllers/reservationController.js'; 

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
      origin: "http://microservices.dev", 
      credentials: true,
    })
);

async function initialize() {
  try {
    await connectDatabase(); 
    console.log("Database connected successfully.");

  
    await subscribeReservationChannel();
    console.log("Redis subscription started successfully.");
    
  } catch (error) {
    console.error("Error initializing the app:", error);
  }
}

initialize();


app.use("/api/reservations", reservationRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
