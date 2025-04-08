const Rol = require("../models/rol.model");

const crearRol = async (req, res) => {
  try {
    const rol = await Rol.create(req.body);
    res.status(200).json({ message: "rol creado", rol });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const encontrarRoles = async (req, res) => {
  try {
    const roles = await Rol.findAll();
    res.status(200).json(roles);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const encontrarRol = async (req, res) => {
  try {
    const { id } = req.params;
    const rol = await Rol.findByPk(id);
    res.status(200).json(rol);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const actualizarRol = async (req, res) => {
  try {
    const { id } = req.params;
    const rol = await Rol.findByPk(id);
    if (!rol) {
      return res.status(404).json({ message: "rol no encontrado" });
    }
    await rol.update(req.body, { where: { idRol: id } });
    res.status(200).json("rol actualizado");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const eliminarRol = async (req, res) => {
  try {
    const { id } = req.params;
    const rol = await Rol.findByPk(id);
    await rol.destroy();
    res.status(200).json("rol eliminado");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  crearRol,
  encontrarRoles,
  encontrarRol,
  actualizarRol,
  eliminarRol,
};
