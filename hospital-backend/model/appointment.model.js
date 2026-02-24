import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: Date,
  status: { type: String, default: "booked" },
});

export const appointmentModel = mongoose.model(
  "Appointment",
  appointmentSchema,
);
