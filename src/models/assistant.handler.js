// Desestructuramos directamente las funciones de servicio
const {
  getOccupiedCapacity,
  getAvailableCapacity,
  getShelfMaxCapacity,
  getShelfCapacity,
  getFootwearMostRepeat
} = require("../services/assistant.service");

const intents = [
  {
    // retorna la capacidad total disponible entre todos los estantes
    name: "capacidad_total_disponible_estantes",
    keywords: ["capacidad", "total", "disponible", "estantes"],
    handler: async () => {
      const totalDisponible = await getAvailableCapacity();
      return `La capacidad total disponible entre todos los estantes es de ${totalDisponible} unidades.`;
    },
  },
  {
    // retorna la capacidad total ocupada entre todos los estantes
    name: "capacidad_total_ocupada_estantes",
    keywords: ["capacidad", "total", "ocupada", "estantes"],
    handler: async () => {
      const totalOcupada = await getOccupiedCapacity();
      return `El espacio total ocupado entre todos los estantes es de ${totalOcupada} unidades.`;
    },
  },
  {
    // retorna la localización del estante con mayor capacidad máxima
    name: "capacidad_maxima_estante",
    keywords: ["estante", "capacidad", "maxima"],
    handler: async () => {
      const estante = await getShelfMaxCapacity();
      return `El estante con la mayor capacidad máxima es ${estante.localizacion} con ${estante.capacidadMaxima} unidades.`;
    },
  },
  {
    // retorna la localización del estante con mayor capacidad disponible
    name: "capacidad_disponible_estante",
    keywords: ["estante", "capacidad", "disponible"],
    handler: async () => {
      const estante = await getShelfCapacity();
      return `El estante con mayor capacidad disponible es ${estante.localizacion} con ${estante.capacidadDisponible} unidades.`;
    },
  },

  {
    name: "calzado_mas_repite_dentro_estantes",
    keywords: ["calzado", "mas", "repite", "dentro", "estantes"],
    handler: async () => {
      const calzado = await getFootwearMostRepeat();
      return `El calzado con más registros dentro de los estantes es ${calzado.codigoBarras} con ${calzado.repeticiones} repeticiones.`;
    },
  },
];

module.exports = { intents };
