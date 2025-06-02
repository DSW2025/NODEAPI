const Marca = require("../models/marca.model");

const crearMarca = async (req, res) => {
  try {
    const marca = await Marca.create(req.body);
    res
      .status(200)
      .json({ success: true, message: "Marca creada", data: marca });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Error, no se pudo crear la marca" });
  }
};

const encontrarMarcas = async (req, res) => {
  try {
    const marcas = await Marca.findAll();
    if (!marcas) {
      return res
        .status(404)
        .json({ success: false, message: "Marca no encontrada" });
    }
    res.status(200).json({ success: true, data: marcas });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error, no se pudo obtener las marcas",
    });
  }
};

const encontrarMarca = async (req, res) => {
  try {
    const { id } = req.params;
    const marca = await Marca.findByPk(id);
    if (!marca) {
      return res
        .status(404)
        .json({ success: false, message: "Marca no encontrada" });
    }
    res.status(200).json({ success: true, data: marca });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Error, no se pudo obtener la marca" });
  }
};

const actualizarMarca = async (req, res) => {
  try {
    const { id } = req.params;
    const marca = await Marca.findByPk(id);
    if (!marca) {
      return res
        .status(404)
        .json({ success: false, message: "Marca no encontrada" });
    }
    const update = await marca.update(req.body);
    res
      .status(200)
      .json({ success: true, message: "Marca actualizada", data: update });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error, no se pudo actualizar la marca",
    });
  }
};

const eliminarMarca = async (req, res) => {
  try {
    const { id } = req.params;
    const marca = await Marca.findByPk(id);
    if (!marca) {
      return res
        .status(404)
        .json({ success: false, message: "Marca no encontrada" });
    }
    await marca.destroy();
    res.status(200).json({ success: true, message: "Marca eliminada" });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Error, no se pudo eliminar la marca" });
  }
};

module.exports = {
  crearMarca,
  encontrarMarcas,
  encontrarMarca,
  actualizarMarca,
  eliminarMarca,
};
