import mongoose from "mongoose";

const checkinSchema = new mongoose.Schema({
  habitId: { type: mongoose.Schema.Types.ObjectId, ref: "Habit" },
  date: { type: Date, required: true },
});

export default mongoose.model("Checkin", checkinSchema);
