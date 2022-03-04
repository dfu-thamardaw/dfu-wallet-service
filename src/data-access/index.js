import mongoose from "mongoose";

export async function connectToDb() {
  console.log(`Connecting to ${process.env.DATABASE_URL}...`);
  await mongoose.connect(process.env.DATABASE_URL);
  console.log(`Connected to ${process.env.DATABASE_URL}`);
}
