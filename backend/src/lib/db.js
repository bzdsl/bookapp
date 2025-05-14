/** @format */

import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`DB connected ${conn.connection.host}`);
  } catch (error) {
    console.log("error connecting to database");
    process.exit(1);
  }
};
