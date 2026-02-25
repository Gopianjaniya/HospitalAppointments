import express from "express";
export const appointmentRouter = express.Router();
import {
  appointmentBookController,
  appointmentCancelController,
  getAllAppointments,
} from "../controller/appointmentController.js";
import { authMiddleware } from "../middlerware/authMiddleware.js";


// ------- appointment
appointmentRouter.post("/book", authMiddleware,appointmentBookController);
appointmentRouter.put("/cancel/:id", authMiddleware,appointmentCancelController);
appointmentRouter.get("/", authMiddleware,getAllAppointments);