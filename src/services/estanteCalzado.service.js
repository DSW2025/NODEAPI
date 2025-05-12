const { CalzadoEstante, Calzado, Color, Talla, Estante } = require("../models");

const obtenerRelacionesDetalladas = async () => {
  try {
    const relaciones = await CalzadoEstante.findAll({
      attributes: ["idCalzadoEstante", "cantidad"],
      include: [
        {
          model: Calzado,
          as: "calzado",
          attributes: ["codigoBarras", "modelo"],
        },
        {
          model: Color,
          as: "color",
          attributes: ["color"], // o ['idColor', 'color']
        },
        {
          model: Talla,
          as: "talla",
          attributes: ["talla"], // o ['idTalla', 'talla']
        },
      ],
    });

    return { success: true, data: relaciones };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Error al obtener relaciones detalladas",
    };
  }
};

const obtenerRelacionesPorEstante = async (idEstante) => {
  try {
    const relaciones = await CalzadoEstante.findAll({
      where: { idEstante },
      attributes: ["idCalzadoEstante", "cantidad"],
      include: [
        {
          model: Calzado,
          as: "calzado",
          attributes: ["codigoBarras", "modelo"],
          include: [
            {
              model: Marca,
              attributes: ["marca"],
            },
          ],
        },
        {
          model: Color,
          as: "color",
          attributes: ["color"],
        },
        {
          model: Talla,
          as: "talla",
          attributes: ["talla"],
        },
      ],
    });

    return { success: true, data: relaciones };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Error al obtener relaciones por estante",
    };
  }
};

const obtenerRelacionesPorCalzado = async (codigoBarras) => {
  try {
    const relaciones = await CalzadoEstante.findAll({
      where: { codigoBarras },
      attributes: ["idCalzadoEstante", "cantidad"],
      include: [
        {
          model: Estante,
          as: "estante",
          attributes: ["localizacion"],
        },
        {
          model: Color,
          as: "color",
          attributes: ["color"],
        },
        {
          model: Talla,
          as: "talla",
          attributes: ["talla"],
        },
      ],
    });

    return { success: true, data: relaciones };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Error al obtener relaciones por calzado",
    };
  }
};

module.exports = {
  obtenerRelacionesDetalladas,
  obtenerRelacionesPorCalzado,
  obtenerRelacionesPorEstante,
};
