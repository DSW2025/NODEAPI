const handleQuery = async (req, res) => {
  const intent = req.intent;

  if (intent.name === "unknown") {
    return res.json({
      answer: "No entendí tu pregunta. Intenta ser más específico.",
    });
  }

  try {
    const answer = await intent.handler(req.body.question); // siempre pasa la pregunta
    res.json({ answer });
  } catch (err) {
    console.error("Error al ejecutar handler:", err);
    res.status(500).json({ answer: "Error interno al procesar tu consulta." });
  }
};

module.exports = { handleQuery };
