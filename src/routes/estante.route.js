const {
  crearEstante,
  encontrarEstantes,
  encontrarEstante,
  actualizarEstante,
  eliminarEstante,
} = require("../controllers/estante.controller");
const express = require("express");

const router = express.Router();

router.post("/", crearEstante);
router.get("/", encontrarEstantes);
router.get("/:id", encontrarEstante);
router.put("/:id", actualizarEstante);
router.delete("/:id", eliminarEstante);

module.exports = router;
