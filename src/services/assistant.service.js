const { Estante, CalzadoEstante, Calzado, Color } = require("../models");
const { Sequelize } = require("sequelize"); // ✅ Clase Sequelize para acceder a funciones como fn, col

// Suma total de capacidad ocupada
const getOccupiedCapacity = async () => {
  return await Estante.sum("capacidadOcupada");
};

// Suma total de capacidad disponible
const getAvailableCapacity = async () => {
  return await Estante.sum("capacidadDisponible");
};

// Retorna el estante con mayor capacidad máxima
const getShelfMaxCapacity = async () => {
  return await Estante.findOne({
    order: [["capacidadMaxima", "DESC"]],
    attributes: ["localizacion", "capacidadMaxima"],
  });
};

// Retorna el estante con mayor capacidad disponible
const getShelfCapacity = async () => {
  return await Estante.findOne({
    order: [["capacidadDisponible", "DESC"]],
    attributes: ["localizacion", "capacidadDisponible"],
  });
};

// Retorna el calzado (codigoBarras) que más veces se repite en CalzadoEstante
const getFootwearMostRepeat = async () => {
  const result = await CalzadoEstante.findOne({
    attributes: [
      "codigoBarras",
      [Sequelize.fn("COUNT", Sequelize.col("codigoBarras")), "repeticiones"],
    ],
    group: ["codigoBarras"],
    order: [[Sequelize.literal("repeticiones"), "DESC"]],
    limit: 1,
    raw: true,
  });

  return result;
};

// Retorna los calzados que se encuentran disponibles con un color en especifico
const getFootwearPerColor = async (nombreColor) => {
  const result = await CalzadoEstante.findAll({
    attributes: ["codigoBarras"],
    include: [
      {
        model: Calzado,
        attributes: ["modelo"],
      },
      {
        model: Color,
        attributes: ["color"],
        where: { color: nombreColor },
      },
      {
        model: Estante,
        attributes: ["localizacion"],
      },
    ],
    raw: true,
  });

  return result;
};

module.exports = {
  getOccupiedCapacity,
  getAvailableCapacity,
  getShelfMaxCapacity,
  getShelfCapacity,
  getFootwearMostRepeat,

  getFootwearPerColor,
};
