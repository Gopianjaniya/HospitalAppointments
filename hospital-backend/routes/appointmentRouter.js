import express from "express";
export const appointmentRouter = express.Router();
import {
  appointmentBookController,
  appointmentCancelController,
  getAllAppointments,
} from "../controller/appointmentController.js";


// ------- appointment
appointmentRouter.post('/book',appointmentBookController)
appointmentRouter.put('/cancel/:id',appointmentCancelController)
appointmentRouter.get('/',getAllAppointments)