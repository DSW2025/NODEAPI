const Talla = require("../models/talla.model");

const crearTalla = async (req, res) => {
  try {
    const talla = await Talla.create(req.body);
    res
      .status(200)
      .json({ success: true, message: "Talla creada", data: talla });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Error, no se pudo crear la talla" });
  }
};

const encontrarTallas = async (req, res) => {
  try {
    const tallas = await Talla.findAll();
    if (!tallas) {
      return res.status(404).json({
        success: false,
        message: "Tallas no encontradas",
      });
    }
    res.status(200).json({ success: true, data: tallas });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error, no se pudo obtener las tallas",
    });
  }
};

const encontrarTalla = async (req, res) => {
  try {
    const { id } = req.params;
    const talla = await Talla.findByPk(id);
    if (!talla) {
      return res
        .status(404)
        .json({ success: false, message: "Talla no encontrada" });
    }
    res.status(200).json({ success: true, data: talla });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Error, no se pudo obtener la talla" });
  }
};

const actualizarTalla = async (req, res) => {
  try {
    const { id } = req.params;
    const talla = await Talla.findByPk(id);
    if (!talla) {
      return res
        .status(404)
        .json({ success: false, message: "Talla no encontrada" });
    }
    const update = await talla.update(req.body);
    res
      .status(200)
      .json({ success: true, message: "Talla actualizada", data: update });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error, no se pudo actualizar la talla",
    });
  }
};

const eliminarTalla = async (req, res) => {
  try {
    const { id } = req.params;
    const talla = await Talla.findByPk(id);
    if (!talla) {
      return res
        .status(404)
        .json({ success: false, message: "Talla no encontrada" });
    }
    await talla.destroy();
    res.status(200).json({ success: true, message: "Talla eliminada" });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Error, no se pudo eliminar la talla" });
  }
};

module.exports = {
  crearTalla,
  encontrarTallas,
  encontrarTalla,
  actualizarTalla,
  eliminarTalla,
};
