const Color = require("../models/color.model");

const crearColor = async (req, res) => {
  try {
    const color = await Color.create(req.body);
    res.status(200).json({ message: "color creado", color });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const encontrarColores = async (req, res) => {
  try {
    const colores = await Color.findAll();
    res.status(200).json(colores);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const encontrarColor = async (req, res) => {
  try {
    const { id } = req.params;
    const color = await Color.findByPk(id);
    res.status(200).json(color);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const actualizarColor = async (req, res) => {
  try {
    const { id } = req.params;
    const color = await Color.findByPk(id);
    if (!color) {
      return res.status(404).json({ message: "color no encontrado" });
    }
    await Color.update(req.body, { where: { idColor: id } });
    res.status(200).json("color actualizado");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const eliminarColor = async (req, res) => {
  try {
    const { id } = req.params;
    const color = await color.findByPk(id);
    await color.destroy();
    res.status(200).json("color eliminado");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  crearColor,
  encontrarColores,
  encontrarColor,
  actualizarColor,
  eliminarColor,
};
