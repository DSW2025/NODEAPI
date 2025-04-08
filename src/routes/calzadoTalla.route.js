const {
  crearRelacion,
  encontrarRelaciones,
  encontrarRelacion,
  actualizarRelacion,
  eliminarRelacion,
} = require("../controllers/calzadoTalla.controller");
const express = require("express");

const router = express.Router();

router.post("/", crearRelacion);
router.get("/", encontrarRelaciones);
router.get("/:id", encontrarRelacion);
router.put("/:id", actualizarRelacion);
router.delete("/:id", eliminarRelacion);

module.exports = router;
