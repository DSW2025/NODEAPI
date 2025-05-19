const express = require("express");
const { parseQuestion } = require("../models/assistant.parser");
const { handleQuery } = require("../controllers/assitant.controller");

const router = express.Router();

router.post("/query", parseQuestion, handleQuery);

module.exports = router;