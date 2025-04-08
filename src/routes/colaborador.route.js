const {
  crearColaborador,
  encontrarColaboradores,
  encontrarColaborador,
  actualizarColaborador,
  eliminarColaborador,
} = require("../controllers/colaborador.controller");
const express = require("express");

const router = express.Router();

router.post("/", crearColaborador);
router.get("/", encontrarColaboradores);
router.get("/:id", encontrarColaborador);
router.put("/:id", actualizarColaborador);
router.delete("/:id", eliminarColaborador);

module.exports = router;
