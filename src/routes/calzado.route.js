const {
  crearCalzado,
  encontrarCalzados,
  encontrarCalzado,
  actualizarCalzado,
  eliminarCalzado,
  getDatos,
  getImagen,
  getColores,
  getTallas,
} = require("../controllers/calzado.controller");
const express = require("express");
const { autorizarRoles } = require("../middlewares/validacionRol.middleware");

const router = express.Router();

router.post("/", autorizarRoles("admin"), crearCalzado);
router.get("/", autorizarRoles("empleado", "admin"), encontrarCalzados);
router.get("/:id/datos", autorizarRoles("empleado", "admin"), getDatos);
router.get("/:id/imagen", autorizarRoles("empleado", "admin"), getImagen);
router.get("/:id/colores", autorizarRoles("empleado", "admin"), getColores);
router.get("/:id/tallas", autorizarRoles("empleado", "admin"), getTallas);
router.get("/:id", autorizarRoles("empleado", "admin"), encontrarCalzado);
router.put("/:id", autorizarRoles("admin"), actualizarCalzado);
router.delete("/:id", autorizarRoles("admin"), eliminarCalzado);

module.exports = router;
