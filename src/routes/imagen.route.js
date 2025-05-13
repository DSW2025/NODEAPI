const {
  subirImagen,
  encontrarImagen,
  encontrarImagenes,
  actualizarImagen,
  eliminarImagen,
} = require("../controllers/imagen.controller");
const express = require("express");
const almacenarImagen = require("../middlewares/subidaArchivo.middleware");

const router = express.Router();

router.post("/subir", almacenarImagen.single("imagen"), subirImagen);
router.get("/", encontrarImagenes);
router.get("/:id", encontrarImagen);
router.put("/:id", actualizarImagen);
router.delete("/:id", eliminarImagen);

module.exports = router;
