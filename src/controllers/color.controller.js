const Color = require("../models/color.model");

const crearColor = async (req, res) => {
  try {
    const color = await Color.create(req.body);
    res
      .status(200)
      .json({ success: true, message: "Colaborador creado", data: color });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Error, no se pudo crear el color" });
  }
};

const encontrarColores = async (req, res) => {
  try {
    const colores = await Color.findAll();
    if (!colores) {
      return res
        .status(404)
        .json({ success: false, message: "No se pudo encontrar los colores" });
    }
    res.status(200).json({ success: true, data: colores });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error, no se pudo encontrar los colores",
    });
  }
};

const encontrarColor = async (req, res) => {
  try {
    const { id } = req.params;
    const color = await Color.findByPk(id);
    if (!color) {
      return res
        .status(404)
        .json({ success: false, message: "Color no encontrado" });
    }
    res.status(200).json({ success: true, data: color });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error, no se pudo encontrar el color",
    });
  }
};

const actualizarColor = async (req, res) => {
  try {
    const { id } = req.params;
    const color = await Color.findByPk(id);
    if (!color) {
      return res
        .status(404)
        .json({ success: false, message: "Color no encontrado" });
    }
    const update = await color.update(req.body);
    res
      .status(200)
      .json({ success: true, message: "Color actualizado", data: update });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error, no se pudo actualizar el color",
    });
  }
};

const eliminarColor = async (req, res) => {
  try {
    const { id } = req.params;
    const color = await Color.findByPk(id);
    if (!color) {
      return res
        .status(404)
        .json({ success: false, message: "Color no encontrado" });
    }
    await color.destroy();
    res.status(200).json({ success: true, message: "Color eliminado" });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Error, no se pudo eliminar el color" });
  }
};

module.exports = {
  crearColor,
  encontrarColores,
  encontrarColor,
  actualizarColor,
  eliminarColor,
};
