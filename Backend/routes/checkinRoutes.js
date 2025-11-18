import express from "express";
import { addCheckin, getStreak } from "../controllers/checkinController.js";

const router = express.Router();

router.post("/", addCheckin);
router.get("/streak/:habitId", getStreak);

export default router;
