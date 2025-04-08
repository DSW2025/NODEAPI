const ColaboradorRol = require("../models/colaboradorRol.model");

const crearRelacion = async (req, res) => {
  try {
    const relacion = await ColaboradorRol.create(req.body);
    res.status(200).json({ message: "relacion creada", relacion });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const encontrarRelaciones = async (req, res) => {
  try {
    const relaciones = await ColaboradorRol.findAll();
    res.status(200).json(relaciones);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const encontrarRelacion = async (req, res) => {
  try {
    const { id } = req.params;
    const relacion = await ColaboradorRol.findByPk(id);
    res.status(200).json(relacion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const actualizarRelacion = async (req, res) => {
  try {
    const { id } = req.params;
    const relacion = await ColaboradorRol.findByPk(id);
    if (!relacion) {
      return res.status(404).json({ message: "relacion no encontrado" });
    }
    await relacion.update(req.body, { where: { idColaboradorRol: id } });
    res.status(200).json("relacion actualizada");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const eliminarRelacion = async (req, res) => {
  try {
    const { id } = req.params;
    const relacion = await ColaboradorRol.findByPk(id);
    await relacion.destroy();
    res.status(200).json("relacion eliminada");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  crearRelacion,
  encontrarRelaciones,
  encontrarRelacion,
  actualizarRelacion,
  eliminarRelacion,
};
