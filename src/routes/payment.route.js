const { realizarPago } = require("../controllers/payment.controller");
const express = require("express");

const router = express.Router();

router.post("/", realizarPago);

module.exports = router;