const Colaborador = require("../models/colaborador.model");
const bcrypt = require('bcryptjs')

const crearColaborador = async (req, res) => {
  try {

    let contraseña = req.body.contraseña || "Equipo#3";
    const salt = await bcrypt.genSalt(10);
    contraseña = await bcrypt.hash(contraseña, salt);
    req.body.contraseña = contraseña;

    const colaborador = await Colaborador.create(req.body);
    res.status(200).json({ message: "colaborador creado", colaborador });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const encontrarColaboradores = async (req, res) => {
  try {
    const colaboradores = await Colaborador.findAll();
    res.status(200).json(colaboradores);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const encontrarColaborador = async (req, res) => {
  try {
    const { id } = req.params;
    const colaborador = await Colaborador.findByPk(id);
    res.status(200).json(colaborador);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const actualizarColaborador = async (req, res) => {
  try {
    const { id } = req.params;
    let { contraseña } = req.body;

    const colaborador = await Colaborador.findByPk(id);
    if (!colaborador) {
      return res.status(404).json({ message: "colaborador no encontrado" });
    }

    if (contraseña) {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(contraseña, salt);
      req.body.contraseña = hashed;
    }

    await colaborador.update(req.body);

    res.status(200).json("colaborador actualizado");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const eliminarColaborador = async (req, res) => {
  try {
    const { id } = req.params;
    const colaborador = await Colaborador.findByPk(id);
    await colaborador.destroy();
    res.status(200).json("colaborador eliminado");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  crearColaborador,
  encontrarColaboradores,
  encontrarColaborador,
  actualizarColaborador,
  eliminarColaborador,
};
