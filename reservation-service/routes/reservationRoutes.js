import express from "express";
import { getLastReservation,getReservationById  } from "../controllers/reservationController.js";

const router = express.Router();


router.get("/last-reservation", getLastReservation);
router.get("/:reservationId", getReservationById);
export default router;
