const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// Conexión a MongoDB
const url = "mongodb://localhost:27017/universidad";
mongoose.connect(url, {})
  .then(() => console.log("✅ Base de datos conectada correctamente"))
  .catch((e) => console.log("❌ Error en la conexión: " + e));

// Definir un modelo simple
const Estudiante = mongoose.model("Estudiante", {
  nombre: String,
  edad: Number,
  carrera: String,
});

// Rutas para probar en Postman
// GET - obtener todos
app.get("/estudiantes", async (req, res) => {
  const data = await Estudiante.find();
  res.json(data);
});

// POST - insertar uno nuevo
app.post("/estudiantes", async (req, res) => {
  const nuevo = new Estudiante(req.body);
  await nuevo.save();
  res.json({ mensaje: "Estudiante creado", data: nuevo });
});

// PUT - actualizar por id
app.put("/estudiantes/:id", async (req, res) => {
  const actualizado = await Estudiante.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ mensaje: "Estudiante actualizado", data: actualizado });
});

// DELETE - eliminar por id
app.delete("/estudiantes/:id", async (req, res) => {
  await Estudiante.findByIdAndDelete(req.params.id);
  res.json({ mensaje: "Estudiante eliminado" });
});

// Levantar servidor
app.listen(3000, () => console.log("🚀 Servidor en http://localhost:3000"));
