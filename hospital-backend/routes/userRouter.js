import express from "express";
import {
  getAllDoctors,
  getAllPatient,
  loginController,
  registerController,
} from "../controller/userController.js";

import { authMiddleware } from "../middlerware/authMiddleware.js";
import { isDoctor } from "../middlerware/roleMiddleware.js";

export const userRouter = express.Router();

userRouter.post("/register", registerController);
userRouter.post("/login", loginController);

userRouter.get("/doctors", authMiddleware, getAllDoctors);
userRouter.get("/patient", authMiddleware, isDoctor, getAllPatient);
