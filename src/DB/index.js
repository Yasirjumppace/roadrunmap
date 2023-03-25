import mongoose from "mongoose";

import dbConfig from "../Config/dbConfig.js";
export const connectDB = async () => {
  try {
    mongoose.set({
      strictQuery: true,
    });
    await mongoose.connect(dbConfig.db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export const RunSeeder = async () => {
  try {
    // Run Subscription Type Seeder
    console.log("Seeder Run Successfully");
  } catch (error) {
    console.log(error);
  }
};
