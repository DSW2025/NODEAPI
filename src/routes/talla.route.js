const {
  crearTalla,
  encontrarTallas,
  encontrarTalla,
  actualizarTalla,
  eliminarTalla,
} = require("../controllers/talla.controller");
const express = require("express");

const router = express.Router();

router.post("/", crearTalla);
router.get("/", encontrarTallas);
router.get("/:id", encontrarTalla);
router.put("/:id", actualizarTalla);
router.delete("/:id", eliminarTalla);

module.exports = router;
