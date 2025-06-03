const express = require("express");
const { parseQuestion } = require("../models/assistant.parser");
const { handleQuery } = require("../controllers/assitant.controller");
const { autorizarRoles } = require("../middlewares/validacionRol.middleware");

const router = express.Router();

router.post(
  "/query",
  autorizarRoles("empleado", "admin"),
  parseQuestion,
  handleQuery
);

module.exports = router;
