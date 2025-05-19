const { Estante, CalzadoEstante } = require('../models');

// Suma total de capacidad máxima
const getMaxCapacity = async () => {
  return await Estante.sum('capacidadMaxima');
};

// Suma total de capacidad ocupada
const getOccupiedCapacity = async () => {
  return await Estante.sum('capacidadOcupada');
};

// Suma total de capacidad disponible
const getAvailableCapacity = async () => {
  return await Estante.sum('capacidadDisponible');
};

// Retorna el estante con mayor capacidad máxima
const getShelfMaxCapacity = async () => {
  return await Estante.findOne({
    order: [['capacidadMaxima', 'DESC']],
    attributes: ['localizacion', 'capacidadMaxima'],
  });
};

// Retorna el estante con mayor capacidad disponible
const getShelfCapacity = async () => {
  return await Estante.findOne({
    order: [['capacidadDisponible', 'DESC']],
    attributes: ['localizacion', 'capacidadDisponible'],
  });
};

// Retorna el calzado (codigoBarras) que más veces se repite en CalzadoEstante
const getFootwearMostRepeat = async () => {
  const result = await CalzadoEstante.findOne({
    attributes: [
      'codigoBarras',
      [sequelize.fn('COUNT', sequelize.col('codigoBarras')), 'repeticiones']
    ],
    group: ['codigoBarras'],
    order: [[sequelize.literal('repeticiones'), 'DESC']],
    limit: 1,
    raw: true
  });

  return result;
};

module.exports = {
  getMaxCapacity,
  getOccupiedCapacity,
  getAvailableCapacity,
  getShelfMaxCapacity,
  getShelfCapacity,
  getFootwearMostRepeat
};
