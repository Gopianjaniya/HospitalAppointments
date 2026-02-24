import express from "express";
import {
  getAllDoctors,
  getAllPatient,
  loginController,
  registerController,
} from "../controller/userController.js";

export const userRouter = express.Router();

userRouter.post("/register", registerController);
userRouter.post("/login", loginController);

userRouter.get("/doctors", getAllDoctors);
userRouter.get("/patient", getAllPatient);
