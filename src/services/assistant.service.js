const { Estante } = require('../models');

// Devuelve el valor máximo del campo 'capacidadMaxima'
const getMaxCapacity = async () => {
  return await Estante.max('capacidadMaxima');
};

// Suma el valor del campo 'capacidadOcupada'
const getOccupiedCapacity = async () => {
  return await Estante.sum('capacidadOcupada');
};

module.exports = {
  getMaxCapacity,
  getOccupiedCapacity
};