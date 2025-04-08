const Marca = require("../models/marca.model");

const crearMarca = async (req, res) => {
  try {
    const marca = await Marca.create(req.body);
    res.status(200).json({ message: "marca creado", marca });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const encontrarMarcas = async (req, res) => {
  try {
    const marcas = await Marca.findAll();
    res.status(200).json(marcas);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const encontrarMarca = async (req, res) => {
  try {
    const { id } = req.params;
    const marca = await Marca.findByPk(id);
    res.status(200).json(marca);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const actualizarMarca = async (req, res) => {
  try {
    const { id } = req.params;
    const marca = await Marca.findByPk(id);
    if (!marca) {
      return res.status(404).json({ message: "marca no encontrado" });
    }
    await marca.update(req.body, { where: { idMarca: id } });
    res.status(200).json("marca actualizado");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const eliminarMarca = async (req, res) => {
  try {
    const { id } = req.params;
    const marca = await Marca.findByPk(id);
    await marca.destroy();
    res.status(200).json("marca eliminado");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  crearMarca,
  encontrarMarcas,
  encontrarMarca,
  actualizarMarca,
  eliminarMarca,
};
