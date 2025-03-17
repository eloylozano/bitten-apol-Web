import mongoose, { Connection } from "mongoose";

export async function mongooseConnect(): Promise<Connection> {
  if (mongoose.connection.readyState >= 1) {
    console.log("🔄 Using existing MongoDB connection");
    return mongoose.connection;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("❌ MONGODB_URI is not defined in environment variables");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    throw error;
  }

  return mongoose.connection;
}
