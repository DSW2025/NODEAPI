const {
  crearRol,
  encontrarRoles,
  encontrarRol,
  actualizarRol,
  eliminarRol,
} = require("../controllers/rol.controller");
const express = require("express");

const router = express.Router();

router.post("/", crearRol);
router.get("/", encontrarRoles);
router.get("/:id", encontrarRol);
router.put("/:id", actualizarRol);
router.delete("/:id", eliminarRol);

module.exports = router;
