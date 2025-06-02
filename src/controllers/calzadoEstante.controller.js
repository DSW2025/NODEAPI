const CalzadoEstante = require("../models/calzadoEstante.model");
const {
  Estante,
  Calzado,
  Talla,
  Color,
  CalzadoTalla,
  CalzadoColor,
} = require("../models");
const {
  obtenerRelacionesDetalladas,
  obtenerRelacionesPorEstante,
  obtenerRelacionesPorCalzado,
} = require("../services/estanteCalzado.service");

const crearRelacion = async (req, res) => {
  try {
    const relacion = await CalzadoEstante.create(req.body);
    const { idEstante, idTalla, idColor, codigoBarras, cantidad } = req.body;

    const estante = await Estante.findByPk(idEstante);
    const calzado = await Calzado.findByPk(codigoBarras);
    const talla = await Talla.findByPk(idTalla);
    const color = await Color.findByPk(idColor);

    if (!estante) {
      return res
        .status(404)
        .json({ success: false, message: "Estante no encontrado" });
    }
    if (!calzado) {
      return res
        .status(404)
        .json({ success: false, message: "Calzado no encontrado" });
    }
    if (!talla) {
      return res
        .status(404)
        .json({ success: false, message: "Talla no encontrado" });
    }
    if (!color) {
      return res
        .status(404)
        .json({ success: false, message: "Color no encontrado" });
    }
    const nuevaCapacidadOcupada = estante.capacidadOcupada + cantidad;
    const nuevaCapacidadDisponible = estante.capacidadDisponible - cantidad;
    if (nuevaCapacidadDisponible < 0) {
      return res.status(400).json({
        success: false,
        message: "No hay suficiente espacio en el estante",
      });
    }
    await estante.update({
      capacidadOcupada: nuevaCapacidadOcupada,
      capacidadDisponible: nuevaCapacidadDisponible,
    });
    res
      .status(200)
      .json({ success: true, message: "Relacion creada", data: relacion });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Error, no se pudo crear la relacion" });
  }
};

const actualizarRelacion = async (req, res) => {
  try {
    const { id } = req.params;
    const nuevaCantidad = req.body.cantidad;
    const relacion = await CalzadoEstante.findByPk(id);
    if (!relacion) {
      return res
        .status(404)
        .json({ success: false, message: "Relacion no encontrada" });
    }
    const { idEstante, idTalla, idColor, codigoBarras } = req.body;
    let estanteUsado;
    if (idEstante) {
      estanteUsado = await Estante.findByPk(idEstante);
      if (!estanteUsado) {
        return res
          .status(404)
          .json({ success: false, message: "Estante no encontrado" });
      }
      relacion.idEstante = idEstante;
    } else {
      estanteUsado = await Estante.findByPk(relacion.idEstante);
    }

    if (codigoBarras) {
      const calzado = await Calzado.findByPk(codigoBarras);
      if (!calzado) {
        return res
          .status(404)
          .json({ success: false, message: "Calzado no encontrado" });
      }
      relacion.codigoBarras = codigoBarras;
    }

    if (idTalla) {
      const calzadoTalla = await CalzadoTalla.findByPk(idTalla);
      if (!calzadoTalla) {
        return res
          .status(404)
          .json({ success: false, message: "Talla no encontrada" });
      }
      relacion.idTalla = idTalla;
    }

    if (idColor) {
      const color = await Color.findByPk(idColor);
      if (!color) {
        return res
          .status(404)
          .json({ success: false, message: "Color no encontrado" });
      }
      relacion.idColor = idColor;
    }

    if (nuevaCantidad !== undefined) {
      const cantidadAnterior = relacion.cantidad;
      const diferencia = nuevaCantidad - cantidadAnterior;
      const nuevaCapacidadOcupada = estanteUsado.capacidadOcupada + diferencia;
      const nuevaCapacidadDisponible =
        estanteUsado.capacidadDisponible - diferencia;
      relacion.cantidad = nuevaCantidad;
      if (nuevaCapacidadDisponible < 0) {
        return res.status(400).json({
          success: false,
          message: "No hay suficiente espacio en el estante ",
        });
      }
      await estanteUsado.update({
        capacidadOcupada: nuevaCapacidadOcupada,
        capacidadDisponible: nuevaCapacidadDisponible,
      });
    }

    const update = await relacion.save();
    res
      .status(200)
      .json({ success: true, message: "Relacion actualizada", data: update });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error, no se pudo actualizar la relacion",
    });
  }
};

const eliminarRelacion = async (req, res) => {
  try {
    const { id } = req.params;
    F;
    const relacion = await CalzadoEstante.findByPk(id);
    if (!relacion) {
      return res
        .status(404)
        .json({ success: false, message: "No se encontro la relacion" });
    }
    const estante = await Estante.findByPk(relacion.idEstante);

    const cantidad = relacion.cantidad;

    const nuevaCapacidadOcupada = estante.capacidadOcupada - cantidad;
    const nuevaCapacidadDisponible = estante.capacidadDisponible + cantidad;

    await estante.update({
      capacidadOcupada: nuevaCapacidadOcupada,
      capacidadDisponible: nuevaCapacidadDisponible,
    });
    await relacion.destroy();
    res.status(200).json({ success: true, message: "Relacion eliminada" });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error, no se pudo eliminar la relacion",
    });
  }
};

const encontrarRelaciones = async (req, res) => {
  try {
    const relaciones = await CalzadoEstante.findAll();
    if (!relaciones) {
      return res
        .status(404)
        .json({ success: false, message: "No se encontro ninguna relacion" });
    }
    res.status(200).json({ success: true, data: relaciones });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error, no se pudieron obtener las relaciones",
    });
  }
};

const encontrarRelacion = async (req, res) => {
  try {
    const { id } = req.params;
    const relacion = await CalzadoEstante.findByPk(id);
    if (!relacion) {
      return res
        .status(404)
        .json({ success: false, message: "No se pudo encontrar la relacion" });
    }
    res.status(200).json({
      success: true,
      data: relacion,
    });
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        message: "Error, no se pudo obtener la relacion ",
      });
  }
};

const getRelacionesDetalladas = async (req, res) => {
  const resultado = await obtenerRelacionesDetalladas();
  if (!resultado.success) {
    return res.status(500).json({ success: false, message: resultado.message });
  }
  res.status(200).json({ success: true, data: resultado });
};

const getRelacionesPorEstante = async (req, res) => {
  const { id } = req.params;
  const resultado = await obtenerRelacionesPorEstante(id);
  if (!resultado.success) {
    return res.status(500).json({ success: false, message: resultado.message });
  }
  res.status(200).json({ success: true, data: resultado });
};

const getRelacionesPorCalzado = async (req, res) => {
  const { id } = req.params;
  const resultado = await obtenerRelacionesPorCalzado(id);
  if (!resultado.success) {
    return res.status(500).json({ success: false, message: resultado.message });
  }
  res.status(200).json({ success: true, data: resultado });
};

module.exports = {
  crearRelacion,
  encontrarRelaciones,
  encontrarRelacion,
  actualizarRelacion,
  eliminarRelacion,

  getRelacionesDetalladas,
  getRelacionesPorEstante,
  getRelacionesPorCalzado,
};
