const { CalzadoEstante, Calzado, Color, Talla, Estante, Marca } = require("../models");

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
    return {
      success: false,
      message: "Error, se pudieron obtener las relaciones detalladas",
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
              as:"marca",
              attributes: ["marca"],
            },
          ],
        },
        {
          model: Color,
          as: "color",
          attributes: ["idColor", "color"],
        },
        {
          model: Talla,
          as: "talla",
          attributes: ["idTalla", "talla"],
        },
      ],
    });

    return { success: true, data: relaciones };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Error, no se pudieron obtener las relaciones por estante",
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
      message: "Error, no se puedieron obtener las relaciones por calzado",
    };
  }
};

module.exports = {
  obtenerRelacionesDetalladas,
  obtenerRelacionesPorCalzado,
  obtenerRelacionesPorEstante,
};
