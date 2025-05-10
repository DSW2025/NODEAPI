const {
  crearCalzado,
  encontrarCalzados,
  encontrarCalzado,
  actualizarCalzado,
  eliminarCalzado,
  getDatos
} = require("../controllers/calzado.controller");
const express = require("express");

const router = express.Router();

router.post("/", crearCalzado);
router.get("/", encontrarCalzados);
router.get("/:id", encontrarCalzado);
router.put("/:id", actualizarCalzado);
router.delete("/:id", eliminarCalzado);

router.get("/:id/datos", getDatos);

module.exports = router;
