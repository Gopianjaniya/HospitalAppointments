import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    mongoose.connect(
      "mongodb+srv://gopilalanjaniya_db_user:gopi123@cluster0.daoy2nw.mongodb.net/hospital",
    );
    console.log("Connected DB Success");
  } catch (error) {
    console.log(error.message);
  }
};
