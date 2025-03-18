import { mongooseConnect } from "../lib/mongoose";
import { Product } from "../models/Product";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  const { query } = req.query; // Obtén el término de búsqueda desde la query string

  try {
    await mongooseConnect(); // Conecta a MongoDB

    // Realiza la búsqueda en la base de datos
    const products = await Product.find(
      {
        $or: [
          { title: { $regex: query, $options: "i" } }, // Busca en el título (insensible a mayúsculas/minúsculas)
          { description: { $regex: query, $options: "i" } }, // Busca en la descripción
        ],
      },
      { title: 1, description: 1, price: 1, images: 1 } // Selecciona los campos que quieres devolver
    ).limit(10); // Limita el número de resultados

    res.status(200).json(products); // Devuelve los productos encontrados
  } catch (error) {
    console.error("Error en la búsqueda:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
}