const { Calzado, Estante } = require("../models");

const calcularCapacidades = async () => {
  const ocupada = await Estante.sum("capacidadOcupada");
  const disponible = await Estante.sum("capacidadDisponible");
  return {
    success: true,
    data: {
      ocupada: ocupada ?? 0,
      disponible: disponible ?? 0,
    },
  };
};

// devolucion de todos los estantes con sus capacidades disponibles

const calzadosContenidos = async (req, res) => {
  const { id } = req.params;
  try {
    const estante = await Estante.findByPk(id, {
      include: [
        {
          model: Calzado,
          as: "calzados",
          attributes: ["codigoBarras"],
          through: {
            attributes: ["cantidad"],
          },
          required: true,
        },
      ],
    });

    if (!estante) {
      return res
        .status(404)
        .json({ success: false, message: "estante no encontrado" });
    }

    return { success: true, data: estante };
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "error al obtener datos" });
  }
};

module.exports = {
  calcularCapacidades,
  calzadosContenidos,
};
