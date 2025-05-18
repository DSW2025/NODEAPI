const { intents } = require("./assistant.handlers");

const parseQuestion = (req, res, next) => {
  const { question } = req.body;
  const text = (question || "").toLowerCase();
  const tokens = text.match(/\b\w+\b/g) || [];

  // Buscamos el intent cuyo keywords estén incluidas en tokens
  const intent = intents.find((i) =>
    i.keywords.every((k) => tokens.includes(k))
  );

  req.intent = intent || { name: "unknown" };
  next();
};

module.exports = { parseQuestion };
