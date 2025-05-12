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

const router = express.Router();

router.post("/", crearRelacion);
router.get("/", encontrarRelaciones);
router.get('/detalles', getRelacionesDetalladas);
router.get('/detalles/estante/:id', getRelacionesPorEstante);
router.get('/detalles/calzado/:id', getRelacionesPorCalzado);
router.get("/:id", encontrarRelacion);
router.put("/:id", actualizarRelacion);
router.delete("/:id", eliminarRelacion);

module.exports = router;
