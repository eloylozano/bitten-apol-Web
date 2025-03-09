// models/User.ts
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: String,
  profilePicture: String,
  address: {
    street: String,
    city: String,
    postalCode: String,
    country: String,
  },
});

export default mongoose.models.User || mongoose.model("User", userSchema);