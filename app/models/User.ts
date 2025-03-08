import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Verifica si el modelo ya existe antes de crearlo
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
