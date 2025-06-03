const {
  crearTalla,
  encontrarTallas,
  encontrarTalla,
  actualizarTalla,
  eliminarTalla,
} = require("../controllers/talla.controller");
const express = require("express");
const { autorizarRoles } = require("../middlewares/validacionRol.middleware");

const router = express.Router();

router.post("/", autorizarRoles("admin"), crearTalla);
router.get("/", autorizarRoles("empleado", "admin"), encontrarTallas);
router.get("/:id", autorizarRoles("empleado", "admin"), encontrarTalla);
router.put("/:id", autorizarRoles("admin"), actualizarTalla);
router.delete("/:id", autorizarRoles("admin"), eliminarTalla);

module.exports = router;
