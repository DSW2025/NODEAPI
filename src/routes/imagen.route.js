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

router.post("/subir", autorizarRoles("empleado", "admin"), almacenarImagen.single("imagen"), subirImagen);
router.get("/", autorizarRoles("empleado", "admin"), encontrarImagenes);
router.get("/:id", autorizarRoles("empleado", "admin"), encontrarImagen);
router.put("/:id", autorizarRoles("empleado", "admin"), actualizarImagen);
router.delete("/:id", autorizarRoles("empleado", "admin"), eliminarImagen);

module.exports = router;
