const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, ".env"),
});
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const realizarPago = async (req, res) => {
  try {
    const amountParam = req.body.amount;
    if (!amountParam) {
      return res
        .status(400)
        .json({ error: "Debe especificar el parámetro 'amount' en centavos" });
    }

    const amount = parseInt(amountParam, 10);
    if (isNaN(amount) || amount <= 0) {
      return res
        .status(400)
        .json({ error: "El parámetro 'amount' debe ser un número positivo" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "mxn",
    });

    // 3) Enviar el clientSecret al cliente
    return res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error en realizarPago:", error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  realizarPago,
};
