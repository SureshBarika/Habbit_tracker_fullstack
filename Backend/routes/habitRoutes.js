import express from "express";
import { createHabit, getHabits, deleteHabit } from "../controllers/habitController.js";

const router = express.Router();

router.post("/", createHabit);
router.get("/:userId", getHabits);
router.delete("/:id", deleteHabit);

export default router;
