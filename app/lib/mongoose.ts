// Dentro de mongooseConnect.js
import mongoose from 'mongoose';

export async function mongooseConnect() {
  if (mongoose.connection.readyState === 1) {
    console.log("Conexión ya establecida");
    return;
  }
  
  try {
    console.log("Conectando a MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Conexión exitosa a MongoDB");
  } catch (error) {
    console.error("Error de conexión a MongoDB:", error);
  }
}
