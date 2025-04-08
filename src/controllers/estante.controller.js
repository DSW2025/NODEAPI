const Estante = require("../models/estante.model");

const crearEstante = async (req, res) => {
  try {
    const estante = await Estante.create(req.body);
    res.status(200).json({ message: "estante creado", estante });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const encontrarEstantes = async (req, res) => {
  try {
    const estantes = await Estante.findAll();
    res.status(200).json(estantes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const encontrarEstante = async (req, res) => {
  try {
    const { id } = req.params;
    const estante = await Estante.findByPk(id);
    res.status(200).json(estante);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const actualizarEstante = async (req, res) => {
  try {
    const { id } = req.params;
    const estante = await Estante.findByPk(id);
    if (!estante) {
      return res.status(404).json({ message: "estante no encontrado" });
    }
    await estante.update(req.body, { where: { idEstante: id } });
    res.status(200).json("estante actualizado");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const eliminarEstante = async (req, res) => {
  try {
    const { id } = req.params;
    const estante = await Estante.findByPk(id);
    await estante.destroy();
    res.status(200).json("estante eliminado");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  crearEstante,
  encontrarEstantes,
  encontrarEstante,
  actualizarEstante,
  eliminarEstante,
};
