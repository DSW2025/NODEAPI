const {
  crearColor,
  encontrarColores,
  encontrarColor,
  actualizarColor,
  eliminarColor,
} = require("../controllers/color.controller");
const express = require("express");

const router = express.Router();

router.post("/", crearColor);
router.get("/", encontrarColores);
router.get("/:id", encontrarColor);
router.put("/:id", actualizarColor);
router.delete("/:id", eliminarColor);

module.exports = router;
