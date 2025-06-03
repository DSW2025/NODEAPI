const {
  crearRelacion,
  encontrarRelaciones,
  encontrarRelacion,
  actualizarRelacion,
  eliminarRelacion,
} = require("../controllers/calzadoColor.controller");
const express = require("express");
const { autorizarRoles } = require("../middlewares/validacionRol.middleware");

const router = express.Router();

router.post("/", autorizarRoles("empleado", "admin"), crearRelacion);
router.get("/", autorizarRoles("empleado", "admin"), encontrarRelaciones);
router.get("/:id", autorizarRoles("empleado", "admin"), encontrarRelacion);
router.put("/:id", autorizarRoles("empleado", "admin"), actualizarRelacion);
router.delete("/:id", autorizarRoles("empleado", "admin"), eliminarRelacion);

module.exports = router;
