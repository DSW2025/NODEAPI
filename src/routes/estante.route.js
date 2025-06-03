const {
  crearEstante,
  encontrarEstantes,
  encontrarEstante,
  actualizarEstante,
  eliminarEstante,

  getCapacidades,
  getCalzados,
} = require("../controllers/estante.controller");
const express = require("express");
const { autorizarRoles } = require("../middlewares/validacionRol.middleware");

const router = express.Router();

router.post("/", autorizarRoles("admin"), crearEstante);
router.get("/", autorizarRoles("empleado", "admin"), encontrarEstantes);
router.get("/capacidades", autorizarRoles("empleado", "admin"), getCapacidades);
router.get("/:id", autorizarRoles("empleado", "admin"), encontrarEstante);
router.put("/:id", autorizarRoles("admin"), actualizarEstante);
router.delete("/:id", autorizarRoles("admin"), eliminarEstante);
router.get("/:id/calzados", autorizarRoles("empleado", "admin"), getCalzados);

module.exports = router;
