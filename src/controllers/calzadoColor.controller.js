const { Calzado, Color } = require("../models");
const CalzadoColor = require("../models/calzadoColor.model");

const crearRelacion = async (req, res) => {
  try {
    const relacion = await CalzadoColor.create(req.body);
    res
      .status(200)
      .json({ success: true, message: "Relacion creada", data: relacion });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Error, no se pudo crear la relacion" });
  }
};

const encontrarRelaciones = async (req, res) => {
  try {
    const relaciones = await CalzadoColor.findAll();
    if (!relaciones) {
      return res
        .status(404)
        .json({ success: false, message: "Relaciones no encontradas" });
    }
    res.status(200).json({ success: true, data: relaciones });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error, no se pudo encontrar las relaciones",
    });
  }
};

const encontrarRelacion = async (req, res) => {
  try {
    const { id } = req.params;
    const relacion = await CalzadoColor.findByPk(id);
    if (!relacion) {
      return res
        .status(404)
        .json({ success: false, message: "Relacion no encontrada" });
    }
    res.status(200).json({ success: true, data: relacion });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error, no se pudo ontener la relacion",
    });
  }
};

const actualizarRelacion = async (req, res) => {
  try {
    const { id } = req.params;
    const relacion = await CalzadoColor.findByPk(id);
    if (!relacion) {
      return res
        .status(404)
        .json({ success: false, message: "Relacion no encontrada" });
    }
    const { codigoBarras, idColor } = req.body;
    const updates = {};
    if (codigoBarras) {
      const calzado = await Calzado.findByPk(codigoBarras);
      if (!calzado) {
        return res
          .status(404)
          .json({ success: false, message: "Calzado no encontrado" });
      }
      updates.codigoBarras = codigoBarras;
    }
    if (idColor) {
      const color = await Color.findByPk(idColor);
      if (!color) {
        return res
          .status(404)
          .json({ success: false, message: "Color no encontrado" });
      }
      updates.idColor = idColor;
    }
    const update = await relacion.update(updates);
    res
      .status(200)
      .json({ success: true, message: "Relacion actualizada", data: update });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error, no se pudo actualizar la relacion",
    });
  }
};

const eliminarRelacion = async (req, res) => {
  try {
    const { id } = req.params;
    const relacion = await CalzadoColor.findByPk(id);
    if (!relacion) {
      return res
        .status(404)
        .json({ success: false, message: "Relacion no encontrada" });
    }
    await relacion.destroy();
    res.status(200).json({ success: true, message: "Relacion eliminada" });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error, no se pudo eliminar la relacion",
    });
  }
};

module.exports = {
  crearRelacion,
  encontrarRelaciones,
  encontrarRelacion,
  actualizarRelacion,
  eliminarRelacion,
};
