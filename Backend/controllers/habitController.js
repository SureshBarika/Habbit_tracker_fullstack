import Habit from "../models/Habit.js";
import Checkin from "../models/Checkin.js";

export const createHabit = async (req, res) => {
  try {
    const habit = await Habit.create(req.body);
    res.json(habit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.params.userId });
    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteHabit = async (req, res) => {
  try {
    const { id } = req.params

    // remove habit
    const deleted = await Habit.findByIdAndDelete(id)
    if (!deleted) return res.status(404).json({ message: 'Habit not found' })

    // also delete related checkins
    await Checkin.deleteMany({ habitId: id })

    res.json({ message: 'Deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
