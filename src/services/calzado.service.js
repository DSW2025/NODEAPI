const { Calzado, Color, Imagen, Talla, Estante } = require("../models");
const opcionesDatos = async (id) => {
  const calzado = await Calzado.findByPk(id, {
    include: [
      {
        model: Color,
        as: "colores",
        attributes: ["idColor", "color"],
        through: { attributes: [] },
        required: false,
      },
      {
        model: Imagen,
        as: "imagen",
        attributes: ["nombreArchivo"],
        required: false,
      },
      {
        model: Talla,
        as: "tallas",
        attributes: ["idTalla", "talla"],
        through: { attributes: [] },
        required: false,
      },
      {
        model: Estante,
        as: "estantes",
        attributes: [
          "idEstante",
          "localizacion",
          "capacidadOcupada",
          "capacidadDisponible",
        ],
        through: { attributes: [] },
        required: false,
      },
    ],
  });

  return calzado;
};

const calzadoImagen = async (id) => {
  const calzado = await Calzado.findByPk(id, {
    include: [
      {
        model: Imagen,
        as: "imagen",
        attributes: ["idImagen", "nombreArchivo"],
        required: false,
      },
    ],
  });

  return calzado;
};

module.exports = {
  opcionesDatos,
  calzadoImagen,
};
