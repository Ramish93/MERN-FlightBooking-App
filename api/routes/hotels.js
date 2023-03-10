import express from "express";

import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getHotel,
  getHotelRooms,
  getHotels,
  updateHotel,
} from "../controllers/hotelControl.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/", verifyAdmin, createHotel);

//update Hotel route
router.put("/:id", verifyAdmin, updateHotel);

// delete Hotel route
router.delete("/:id", verifyAdmin, deleteHotel);

// get one Hotel route
router.get("/find/:id", getHotel);

// get all Hotel route
router.get("/", getHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);

export default router;
