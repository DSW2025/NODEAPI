const {
  crearEstante,
  encontrarEstantes,
  encontrarEstante,
  actualizarEstante,
  eliminarEstante,

  getCapacidades,
  getCalzados
} = require("../controllers/estante.controller");
const express = require("express");

const router = express.Router();

// DE LO GENERAL A LO ESPECIFICO
router.post("/", crearEstante);
router.get("/", encontrarEstantes);
router.get("/capacidades", getCapacidades);
router.get("/:id", encontrarEstante);
router.put("/:id", actualizarEstante);
router.delete("/:id", eliminarEstante);
router.get("/:id/calzados", getCalzados);

module.exports = router;
