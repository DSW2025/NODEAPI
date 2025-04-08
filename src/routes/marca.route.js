const {
  crearMarca,
  encontrarMarcas,
  encontrarMarca,
  actualizarMarca,
  eliminarMarca,
} = require("../controllers/marca.controller");
const express = require("express");

const router = express.Router();

router.post("/", crearMarca);
router.get("/", encontrarMarcas);
router.get("/:id", encontrarMarca);
router.put("/:id", actualizarMarca);
router.delete("/:id", eliminarMarca);

module.exports = router;
