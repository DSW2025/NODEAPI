// Desestructuramos directamente las funciones de servicio
const {
  getMaxCapacity,
  getOccupiedCapacity,
} = require("../services/assistant.service");

const intents = [
  {
    name: "capacidad_maxima_estantes",
    keywords: ["capacidad", "maxima", "estantes"],
    handler: async () => {
      const max = await getMaxCapacity();
      return `La capacidad máxima actual de los estantes es ${max} unidades.`;
    },
  },
  {
    name: "capacidad_ocupada_estantes",
    keywords: ["capacidad", "ocupada", "estantes"],
    handler: async () => {
      const sum = await getOccupiedCapacity();
      return `El espacio ocupado total en los estantes es ${sum} unidades.`;
    },
  },
  // …otros intents que quieras añadir…
];

module.exports = { intents };