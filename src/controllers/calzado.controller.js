const Calzado = require("../models/calzado.model");
const { opcionesDatos } = require("../services/calzado.service");

const crearCalzado = async (req, res) => {
  try {
    const calzado = await Calzado.create(req.body);
    res.status(200).json({ message: "calzado creado", calzado });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const encontrarCalzados = async (req, res) => {
  try {
    const calzados = await Calzado.findAll();
    res.status(200).json(calzados);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const encontrarCalzado = async (req, res) => {
  try {
    const { id } = req.params;
    const calzado = await Calzado.findByPk(id);
    res.status(200).json(calzado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const actualizarCalzado = async (req, res) => {
  try {
    const { id } = req.params;
    const calzado = await Calzado.findByPk(id);
    if (!Calzado) {
      return res.status(404).json({ message: "calzado no encontrado" });
    }
    await calzado.update(req.body, { where: { idCalzado: id } });
    res.status(200).json("calzado actualizado");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const eliminarCalzado = async (req, res) => {
  try {
    const { id } = req.params;
    const calzado = await Calzado.findByPk(id);
    await calzado.destroy();
    res.status(200).json("calzado eliminado");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getDatos = async (req, res) => {
  try {
    const { id } = req.params;
    const calzado = await opcionesDatos(id);

    if (!calzado) {
      return res
        .status(404)
        .json({ success: false, message: "calzado no encontrado" });
    }

    res.json({ success: true, data: calzado });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "error al obtener datos" });
  }
};


module.exports = {
  crearCalzado,
  encontrarCalzados,
  encontrarCalzado,
  actualizarCalzado,
  eliminarCalzado,

  getDatos
};
