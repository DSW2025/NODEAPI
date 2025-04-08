const Talla = require("../models/talla.model");

const crearTalla = async (req, res) => {
  try {
    const talla = await Talla.create(req.body);
    res.status(200).json({ message: "talla creado", talla });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const encontrarTallas = async (req, res) => {
  try {
    const tallas = await Talla.findAll();
    res.status(200).json(tallas);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const encontrarTalla = async (req, res) => {
  try {
    const { id } = req.params;
    const talla = await Talla.findByPk(id);
    res.status(200).json(talla);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const actualizarTalla = async (req, res) => {
  try {
    const { id } = req.params;
    const talla = await Talla.findByPk(id);
    if (!talla) {
      return res.status(404).json({ message: "talla no encontrado" });
    }
    await talla.update(req.body, { where: { idTalla: id } });
    res.status(200).json("talla actualizado");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const eliminarTalla = async (req, res) => {
  try {
    const { id } = req.params;
    const talla = await Talla.findByPk(id);
    await talla.destroy();
    res.status(200).json("talla eliminado");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  crearTalla,
  encontrarTallas,
  encontrarTalla,
  actualizarTalla,
  eliminarTalla,
};
