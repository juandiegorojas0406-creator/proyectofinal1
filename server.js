const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// Conexión a MongoDB
const url = "mongodb://127.0.0.1:27017/universidad"; // usa 127.0.0.1 en lugar de localhost si falla
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Base de datos conectada correctamente"))
  .catch((e) => console.log("❌ Error en la conexión: " + e));

/* ================================
   MODELOS CON SCHEMAS
================================ */
const estudianteSchema = new mongoose.Schema({
  nombre: String,
  edad: Number,
  carrera: String
});
const Estudiante = mongoose.model("Estudiante", estudianteSchema);

const materiaSchema = new mongoose.Schema({
  nombre: String,
  creditos: Number
});
const Materia = mongoose.model("Materia", materiaSchema);

const notaSchema = new mongoose.Schema({
  estudiante: String,
  materia: String,
  nota: Number
});
const Nota = mongoose.model("Nota", notaSchema);

const datoSchema = new mongoose.Schema({
  tipo: String,
  valor: String
});
const Dato = mongoose.model("Dato", datoSchema);

/* ================================
   CRUD GENÉRICOS
================================ */
// ---- Estudiantes ----
app.get("/estudiantes", async (req, res) => res.json(await Estudiante.find()));
app.post("/estudiantes", async (req, res) => res.json(await new Estudiante(req.body).save()));
app.put("/estudiantes/:id", async (req, res) => res.json(await Estudiante.findByIdAndUpdate(req.params.id, req.body, { new: true })));
app.delete("/estudiantes/:id", async (req, res) => res.json(await Estudiante.findByIdAndDelete(req.params.id)));

// ---- Materias ----
app.get("/materias", async (req, res) => res.json(await Materia.find()));
app.post("/materias", async (req, res) => res.json(await new Materia(req.body).save()));
app.put("/materias/:id", async (req, res) => res.json(await Materia.findByIdAndUpdate(req.params.id, req.body, { new: true })));
app.delete("/materias/:id", async (req, res) => res.json(await Materia.findByIdAndDelete(req.params.id)));

// ---- Notas ----
app.get("/notas", async (req, res) => res.json(await Nota.find()));
app.post("/notas", async (req, res) => res.json(await new Nota(req.body).save()));
app.put("/notas/:id", async (req, res) => res.json(await Nota.findByIdAndUpdate(req.params.id, req.body, { new: true })));
app.delete("/notas/:id", async (req, res) => res.json(await Nota.findByIdAndDelete(req.params.id)));

// ---- Datos ----
app.get("/datos", async (req, res) => res.json(await Dato.find()));
app.post("/datos", async (req, res) => res.json(await new Dato(req.body).save()));
app.put("/datos/:id", async (req, res) => res.json(await Dato.findByIdAndUpdate(req.params.id, req.body, { new: true })));
app.delete("/datos/:id", async (req, res) => res.json(await Dato.findByIdAndDelete(req.params.id)));

/* ================================
   SERVIDOR
================================ */
app.listen(3000, () => console.log("🚀 Servidor en http://localhost:3000"));
