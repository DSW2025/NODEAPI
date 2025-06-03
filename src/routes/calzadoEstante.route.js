const {
  crearRelacion,
  encontrarRelaciones,
  encontrarRelacion,
  actualizarRelacion,
  eliminarRelacion,
  getRelacionesDetalladas,
  getRelacionesPorEstante,
  getRelacionesPorCalzado,
} = require("../controllers/calzadoEstante.controller");
const express = require("express");
const { autorizarRoles } = require("../middlewares/validacionRol.middleware");

const router = express.Router();

router.post("/", autorizarRoles("empleado", "admin"), crearRelacion);
router.get("/", autorizarRoles("empleado", "admin"), encontrarRelaciones);
router.get('/detalles', autorizarRoles("empleado", "admin"), getRelacionesDetalladas);
router.get('/detalles/estante/:id', autorizarRoles("empleado", "admin"), getRelacionesPorEstante);
router.get('/detalles/calzado/:id', autorizarRoles("empleado", "admin"), getRelacionesPorCalzado);
router.get("/:id", autorizarRoles("empleado", "admin"), encontrarRelacion);
router.put("/:id", autorizarRoles("empleado", "admin"), actualizarRelacion);
router.delete("/:id", autorizarRoles("empleado", "admin"), eliminarRelacion);

module.exports = router;
