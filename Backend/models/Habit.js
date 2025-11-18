import mongoose from "mongoose";

const habitSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
  category: String,
  priority: { type: Number, default: 1 },
  frequency: { type: String, enum: ["daily", "weekly"], default: "daily" },
  startDate: { type: Date, default: Date.now },
});

export default mongoose.model("Habit", habitSchema);
