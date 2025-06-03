const {
  crearColor,
  encontrarColores,
  encontrarColor,
  actualizarColor,
  eliminarColor,
} = require("../controllers/color.controller");
const express = require("express");
const { autorizarRoles } = require("../middlewares/validacionRol.middleware");

const router = express.Router();

router.post("/", autorizarRoles("admin"), crearColor);
router.get("/", autorizarRoles("empleado", "admin"), encontrarColores);
router.get("/:id", autorizarRoles("empleado", "admin"), encontrarColor);
router.put("/:id", autorizarRoles("admin"), actualizarColor);
router.delete("/:id", autorizarRoles("admin"), eliminarColor);

module.exports = router;
