import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
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

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;