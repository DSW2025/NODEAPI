const {
  crearMarca,
  encontrarMarcas,
  encontrarMarca,
  actualizarMarca,
  eliminarMarca,
} = require("../controllers/marca.controller");
const express = require("express");
const { autorizarRoles } = require("../middlewares/validacionRol.middleware");

const router = express.Router();

router.post("/", autorizarRoles("admin"), crearMarca);
router.get("/", autorizarRoles("empleado", "admin"), encontrarMarcas);
router.get("/:id", autorizarRoles("empleado", "admin"), encontrarMarca);
router.put("/:id", autorizarRoles("admin"), actualizarMarca);
router.delete("/:id", autorizarRoles("admin"), eliminarMarca);

module.exports = router;
