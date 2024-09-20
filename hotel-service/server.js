import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import hotelRoutes from "./routes/hotelRoutes.js";
import cookieParser from "cookie-parser";
import connectDatabase from './config/dbConnect.js';
import { createHotelIndex, syncHotelsToElasticsearch } from './config/elasticsearch.js';

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
        
        await createHotelIndex(); 
        console.log("Hotel index created in Elasticsearch.");
        
        await syncHotelsToElasticsearch(); 
        console.log("Hotels synced to Elasticsearch.");
    } catch (error) {
        console.error("Error initializing the app:", error);
    }
}

initialize();

app.use("/api/hotels", hotelRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
