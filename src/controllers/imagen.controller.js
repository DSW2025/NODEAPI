const { Calzado } = require("../models");
const Imagen = require("../models/imagen.model");
const fs = require("fs");

const subirImagen = async (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "no se subió ninguna imagen" });
  }
  const id = req.body.codigoBarras;
  const calzado = await Calzado.findByPk(id);
  if (!calzado) {

    // borrar el archivo que se sube si no se valida el codigoBarras de calzado, en dado caso aunque no se valide se sube el archivo
    fs.unlinkSync(req.file.path); 

    return res
      .status(400)
      .json({ success: false, message: "calzado no encontrado" });
  }
  try {
    const nuevaImagen = await Imagen.create({
      codigoBarras: req.body.codigoBarras,
      nombreArchivo: req.file.filename,
      ruta: req.file.path, // ruta como 'uploads/foto123.jpg'
    });
    res.status(201).json({ success: true, data: nuevaImagen });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const encontrarImagenes = async (req, res) => {
  try {
    const imagenes = await Imagen.findAll();
    res.status(200).json(imagenes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const encontrarImagen = async (req, res) => {
  try {
    const { id } = req.params;
    const imagen = await Imagen.findByPk(id);
    res.status(200).json(imagen);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const actualizarImagen = async (req, res) => {
  try {
    const { id } = req.params;
    const imagen = await Imagen.findByPk(id);
    if (!imagen) {
      return res.status(404).json({ message: "imagen no encontrado" });
    }
    await Imagen.update(req.body, { where: { idImagen: id } });
    res.status(200).json("imagen actualizada");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const eliminarImagen = async (req, res) => {
  try {
    const { id } = req.params;
    const imagen = await Imagen.findByPk(id);
    await Imagen.destroy();
    res.status(200).json("imagen eliminado");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  subirImagen,
  encontrarImagen,
  encontrarImagenes,
  actualizarImagen,
  eliminarImagen,
};
