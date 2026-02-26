import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { connectDB } from "./config/config.db.js";
import { userRouter } from "./routes/userRouter.js";
import { appointmentRouter } from "./routes/appointmentRouter.js";

connectDB();
export const app = express();
app.use(express.json());
const allowedOrigins = [
  "http://localhost:5173",
  "https://hospital-frontend-henna.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
app.use("/api/user", userRouter);
app.use("/api/appointment", appointmentRouter);

app.get("/", (req, res) => {
  res.send("<h1>Hello, api working</h1>");
});

// app.listen(3000, () => console.log("Server start  on port 3000"));
export default app;
