// Desestructuramos directamente las funciones de servicio
const {
  getOccupiedCapacity,
  getAvailableCapacity,
  getShelfMaxCapacity,
  getShelfCapacity,
  getFootwearMostRepeat,
  getFootwearPerColor
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
    // retorna el calzado que mas repeticiones (movimientos) tiene dentro de todos los estantes
    name: "calzado_mas_repite_dentro_estantes",
    keywords: ["calzado", "mas", "repite", "dentro", "estantes"],
    handler: async () => {
      const calzado = await getFootwearMostRepeat();
      return `El calzado con más registros dentro de los estantes es ${calzado.codigoBarras} con ${calzado.repeticiones} repeticiones.`;
    },
  },

  { // retorna los calzados disponibles con el color que se pregunta junto con la localizacion de los mismos
    name: "calzados_disponibles_con_color",
    keywords: ["calzados", "disponibles", "con" , "color"],
    handler: async (question) => {
      // Extraer el nombre del color de la pregunta (muy simple)
      const colores = [
        "Amarillo",
        "Azul",
        "Beige",
        "Blanco",
        "Cafe",
        "Gris",
        "Morado",
        "Multicolor",
        "Naranja",
        "Negro",
        "Plata",
        "Rojo",
        "Rosa",
        "Verde",
      ];

      const colorEncontrado = colores.find((c) =>
        question.toLowerCase().includes(c.toLowerCase())
      );

      if (!colorEncontrado) {
        return `No se detectó ningún color válido en la pregunta.`;
      }

      const calzados = await getFootwearPerColor(colorEncontrado);

      if (calzados.length === 0) {
        return `No se encontraron calzados disponibles con el color ${colorEncontrado}.`;
      }

      const lista = calzados
        .map(
          (c) =>
            `Modelo: ${c["Calzado.modelo"]}, Código: ${c.codigoBarras}, Estante: ${c["Estante.localizacion"]}`
        )
        .join("\n");

      return `Calzados disponibles en color ${colorEncontrado}:\n${lista}`;
    },
  },
];

module.exports = { intents };
