import Checkin from "../models/Checkin.js";
import dayjs from "dayjs";

export const addCheckin = async (req, res) => {
  try {
    const { habitId } = req.body;

    const today = dayjs().startOf("day").toDate();

    const existing = await Checkin.findOne({ habitId, date: today });
    if (existing) return res.json(existing);

    const checkin = await Checkin.create({ habitId, date: today });

    res.json(checkin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStreak = async (req, res) => {
  try {
    const { habitId } = req.params;

    const checkins = await Checkin.find({ habitId }).sort({ date: -1 });

    let streak = 0;
    let currentDate = dayjs().startOf("day");

    for (let c of checkins) {
      if (dayjs(c.date).isSame(currentDate, "day")) {
        streak++;
        currentDate = currentDate.subtract(1, "day");
      } else break;
    }

    res.json({ streak });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
