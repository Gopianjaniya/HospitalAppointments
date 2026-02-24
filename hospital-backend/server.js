import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/config.db.js";
import { userRouter } from "./routes/userRouter.js";
import { appointmentRouter } from "./routes/appointmentRouter.js";
dotenv.config();

connectDB();
export const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "https://hospital-frontend-henna.vercel.app",
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