// Desestructuramos directamente las funciones de servicio
const {
  getOccupiedCapacity,
  getAvailableCapacity,
  getShelfMaxCapacity,
  getShelfCapacity,
  getFootwearMostRepeat,
  getFootwearPerColor,
  getFootwearPerTalla,
  getFootwearPerMarca
} = require("../services/assistant.service");

const intents = [
  {
    name: "capacidad_total_disponible_estantes",
    keywords: ["capacidad", "total", "disponible", "estantes"],
    handler: async (question) => {
      const totalDisponible = await getAvailableCapacity();
      return `La capacidad total disponible entre todos los estantes es de ${totalDisponible} unidades.`;
    },
  },
  {
    name: "capacidad_total_ocupada_estantes",
    keywords: ["capacidad", "total", "ocupada", "estantes"],
    handler: async (question) => {
      const totalOcupada = await getOccupiedCapacity();
      return `El espacio total ocupado entre todos los estantes es de ${totalOcupada} unidades.`;
    },
  },
  {
    name: "capacidad_maxima_estante",
    keywords: ["estante", "capacidad", "maxima"],
    handler: async (question) => {
      const estante = await getShelfMaxCapacity();
      return `El estante con la mayor capacidad máxima es ${estante.localizacion} con ${estante.capacidadMaxima} unidades.`;
    },
  },
  {
    name: "capacidad_disponible_estante",
    keywords: ["estante", "capacidad", "disponible"],
    handler: async (question) => {
      const estante = await getShelfCapacity();
      return `El estante con mayor capacidad disponible es ${estante.localizacion} con ${estante.capacidadDisponible} unidades.`;
    },
  },
  {
    name: "calzado_mas_repite_dentro_estantes",
    keywords: ["calzado", "mas", "repite", "dentro", "estantes"],
    handler: async (question) => {
      const calzado = await getFootwearMostRepeat();
      return `El calzado con más registros dentro de los estantes es ${calzado.codigoBarras} con ${calzado.repeticiones} repeticiones.`;
    },
  },
  {
    name: "calzados_disponibles_con_color",
    keywords: ["calzados", "disponibles", "con", "color"],
    handler: async (question) => {
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
        question?.toLowerCase().includes(c.toLowerCase())
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
            `Modelo: ${c["calzado.modelo"]}, Código: ${c.codigoBarras}, Estante: ${c["estante.localizacion"]}`
        )
        .join("\n");
      return `Los calzados disponibles en el color ${colorEncontrado}, son: \n ${lista}`;
    },
  },
  {
    name: "calzados_disponibles_con_talla",
    keywords: ["calzados", "disponibles", "en", "talla"],
    handler: async (question) => {
      const tallas = [
        "21",
        "21.5",
        "22",
        "22.5",
        "23",
        "23.5",
        "24",
        "24.5",
        "25",
        "25.5",
        "26",
        "26.5",
        "27",
        "27.5",
        "28",
        "28.5",
        "29",
        "29.5",
        "30",
      ];
      const tallaEncontrada = tallas.find((t) =>
        question?.toLowerCase().includes(t.toLowerCase())
      );
      if (!tallaEncontrada) {
        return `No se detectó ninguna talla válida en la pregunta.`;
      }
      const calzados = await getFootwearPerTalla(tallaEncontrada);
      if (calzados.length === 0) {
        return `No se encontraron calzados disponibles con la talla ${tallaEncontrada}.`;
      }
      const lista = calzados
        .map(
          (c) =>
            `Modelo: ${c["calzado.modelo"]}, Código: ${c.codigoBarras}, Estante: ${c["estante.localizacion"]}`
        )
        .join("\n");
      return `Los calzados disponibles en la talla ${tallaEncontrada}, son:\n${lista}`;
    },
  },
  {
    name: "calzados_disponibles_con_marca",
    keywords: ["calzados", "disponibles", "marca"],
    handler: async (question) => {
      const marcas = [
        "American Fire",
        "American Polo",
        "Apoort",
        "Audaz",
        "Charly",
        "Christian Gallery",
        "DC Shoes",
        "Flexi",
        "Merano",
        "Mora Urban",
        "Negro Total",
        "Pirma",
        "Pontiac",
        "Rebook",
        "Yuyin",
      ];
      const marcaEncontrada = marcas.find((m) =>
        question?.toLowerCase().includes(m.toLowerCase())
      );
      if (!marcaEncontrada) {
        return `No se detectó ninguna marca válida en la pregunta.`;
      }
      const calzados = await getFootwearPerMarca(marcaEncontrada);
      if (calzados.length === 0) {
        return `No se encontraron calzados disponibles de la marca ${marcaEncontrada}.`;
      }
      const lista = calzados
        .map(
          (c) =>
            `Modelo: ${c["calzado.modelo"]}, Código: ${c.codigoBarras}, Estante: ${c["estante.localizacion"]}`
        )
        .join("\n");
      return `Los calzados disponibles de la marca ${marcaEncontrada}, son:\n${lista}`;
    },
  },
];

module.exports = { intents };
