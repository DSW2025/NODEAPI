const Estante = require("../models/estante.model");
const {
  calcularCapacidades,
  calzadosContenidos,
} = require("../services/estante.service");

const crearEstante = async (req, res) => {
  try {
    const { localizacion, capacidadMaxima } = req.body;
    if (!localizacion || capacidadMaxima == null) {
      return res
        .status(400)
        .json({ success: false, message: "Faltan campos requeridos" });
    }
    if (req.body.capacidadDisponible == null) {
      req.body.capacidadDisponible = capacidadMaxima;
    }
    if (req.body.capacidadOcupada == null) {
      req.body.capacidadOcupada = capacidadMaxima;
    }
    const estante = await Estante.create(req.body);
    res
      .status(200)
      .json({ success: true, message: "Estante creado", data: estante });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Error, no se pudo crear el estante" });
  }
};

const encontrarEstantes = async (req, res) => {
  try {
    const estantes = await Estante.findAll();
    if (!estantes) {
      return res
        .status(404)
        .json({ success: false, message: "Estantes no encontrados" });
    }
    res.status(200).json({ success: true, data: estantes });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error, no se pudo obtener los estantes",
    });
  }
};

const encontrarEstante = async (req, res) => {
  try {
    const { id } = req.params;
    const estante = await Estante.findByPk(id);
    if (!estante) {
      return res
        .status(404)
        .json({ success: false, message: "Estante no encontrado" });
    }
    res.status(200).json({ success: true, data: estante });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error, no se pudo obtener el estante",
    });
  }
};

const actualizarEstante = async (req, res) => {
  try {
    const { id } = req.params;
    const estante = await Estante.findByPk(id);
    if (!estante) {
      return res
        .status(404)
        .json({ success: false, message: "Estante no encontrado" });
    }
    const update = await estante.update(req.body);
    res
      .status(200)
      .json({ success: true, message: "Estante actualizado", data: update });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error, no se pudo actualizar el estante",
    });
  }
};

const eliminarEstante = async (req, res) => {
  try {
    const { id } = req.params;
    const estante = await Estante.findByPk(id);
    if (!estante) {
      return res
        .status(404)
        .json({ success: false, message: "Estante no encontrado" });
    }
    await estante.destroy();
    res.status(200).json({ success: true, message: "Estante eliminado" });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error, no se pudo eliminar el estante",
    });
  }
};

const getCapacidades = async (req, res) => {
  try {
    const result = await calcularCapacidades();
    res.json(result);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error al obtener totales" });
  }
};

const getCalzados = async (req, res) => {
  try {
    const result = await calzadosContenidos(req, res);
    res.json(result);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error al obtener los calzados" });
  }
};

module.exports = {
  crearEstante,
  encontrarEstantes,
  encontrarEstante,
  actualizarEstante,
  eliminarEstante,

  getCapacidades,
  getCalzados,
};
