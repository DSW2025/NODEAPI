const express = require("express");
const { parseQuestion } = require("./assistant.parser");
const { handleQuery } = require("./assistant.controller");

const router = express.Router();

router.post("/query", parseQuestion, handleQuery);

module.exports = router;