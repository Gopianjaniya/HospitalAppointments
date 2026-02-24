import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    mongoose.connect(`${process.env.MONGO_URI}`);
    console.log("Connected DB Success");
  } catch (error) {
    console.log(error.message);
  }
};
