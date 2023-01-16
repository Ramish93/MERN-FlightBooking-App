import express from "express";

import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
} from "../controllers/roomControl.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/:hotelid", verifyAdmin, createRoom);

//update Room route
router.put("/:id", verifyAdmin, updateRoom);

// delete Room route
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

// get one Room route
router.get("/:id", getRoom);

// get all Room route
router.get("/", getRooms);

export default router;
