const { Talla, Calzado } = require("../models");
const CalzadoTalla = require("../models/calzadoTalla.model");

const crearRelacion = async (req, res) => {
  try {
    const { codigoBarras, idTalla } = req.body();
    const talla = await Talla.findByPk(idTalla);
    const calzado = await Calzado.findByPk(codigoBarras);
    const relacion = await CalzadoTalla.create(req.body);
    if (!talla) {
      return res
        .status(404)
        .json({ success: false, message: "Talla no encontrada" });
    }
    if (!calzado) {
      return res
        .status(404)
        .json({ success: false, message: "Calzado no encontrado" });
    }
    res
      .status(200)
      .json({ success: true, message: "Relacion creada", data: relacion });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Error, no se pudo crear la relacion" });
  }
};

const encontrarRelaciones = async (req, res) => {
  try {
    const relaciones = await CalzadoTalla.findAll();
    if (!relaciones) {
      return res
        .status(404)
        .json({ success: false, message: "Relaciones no encontradas" });
    }
    res.status(200).json({ success: true, data: relaciones });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error, no se pudo obtener las relaciones ",
    });
  }
};

const encontrarRelacion = async (req, res) => {
  try {
    const { id } = req.params;
    const relacion = await CalzadoTalla.findByPk(id);
    if (!relacion) {
      return res
        .status(404)
        .json({ success: true, message: "Relacion no encontrada" });
    }
    res.status(200).json({ success: true, data: relacion });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error, no se pudo encontrar la relacion",
    });
  }
};

const actualizarRelacion = async (req, res) => {
  try {
    const { id } = req.params;
    const relacion = await CalzadoTalla.findByPk(id);
    if (!relacion) {
      return res
        .status(404)
        .json({ success: false, message: "Relacion no encontrado" });
    }
    const { codigoBarras, idTalla } = req.body;
    const updates = {};
    if (codigoBarras) {
      const calzado = await Calzado.findByPk(codigoBarras);
      if (!calzado) {
        return res
          .status(404)
          .json({ success: false, message: "Calzado no encontrado" });
      }
      updates.codigoBarras = codigoBarras;
    }
    if (idTalla) {
      const talla = await Talla.findByPk(idTalla);
      if (!talla) {
        return res
          .status(404)
          .json({ success: false, message: "Talla no encontrada" });
      }
      updates.idTalla = idTalla;
    }
    const update = await relacion.update(updates);
    res
      .status(200)
      .json({ success: true, message: "Relacion actualizada", data: update });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error, la relacion no se pudo actualizar",
    });
  }
};

const eliminarRelacion = async (req, res) => {
  try {
    const { id } = req.params;
    const relacion = await CalzadoTalla.findByPk(id);
    if (!relacion) {
      return res
        .status(404)
        .json({ success: false, message: "Relacion no encontrada" });
    }
    await relacion.destroy();
    res.status(200).json({ success: false, message: "Relacion eliminada" });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error, la relacion no se pudo eliminar",
    });
  }
};

module.exports = {
  crearRelacion,
  encontrarRelaciones,
  encontrarRelacion,
  actualizarRelacion,
  eliminarRelacion,
};
