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
      return res.status(404).json({ message: "estante no encontrado" });
    }
    if (!calzado) {
      return res.status(404).json({ message: "calzado no encontrado" });
    }
    if (!talla) {
      return res.status(404).json({ message: "talla no encontrado" });
    }
    if (!color) {
      return res.status(404).json({ message: "color no encontrado" });
    }

    const nuevaCapacidadOcupada = estante.capacidadOcupada + cantidad;
    const nuevaCapacidadDisponible = estante.capacidadDisponible - cantidad;

    // Validar que haya espacio disponible
    if (nuevaCapacidadDisponible < 0) {
      return res
        .status(400)
        .json({ message: "no hay suficiente espacio en el estante" });
    }

    await estante.update({
      capacidadOcupada: nuevaCapacidadOcupada,
      capacidadDisponible: nuevaCapacidadDisponible,
    });

    res.status(200).json({ message: "relacion creada", relacion });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const actualizarRelacion = async (req, res) => {
  try {
    const { id } = req.params;
    const nuevaCantidad = req.body.cantidad;

    const relacion = await CalzadoEstante.findByPk(id);
    const { idEstante, idTalla, idColor, codigoBarras, cantidad } = req.body;

    const estante = await Estante.findByPk(idEstante);
    const calzado = await Calzado.findByPk(codigoBarras);
    const calzadoTalla = await CalzadoTalla(idTalla);
    const color = await Color.findByPk(idColor);

    if (!estante) {
      return res.status(404).json({ message: "estante no encontrado" });
    }
    if (!calzado) {
      return res.status(404).json({ message: "calzado no encontrado" });
    }
    if (!talla) {
      return res.status(404).json({ message: "talla no encontrado" });
    }
    if (!color) {
      return res.status(404).json({ message: "color no encontrado" });
    }

    // Verificar si existe la relación calzado-talla
    const existeRelacionTalla = await CalzadoTalla.findOne({
      where: {
        codigoBarras,
        idTalla,
      },
    });

    if (!existeRelacionTalla) {
      return res.status(404).json({
        message: "no existe relación entre el calzado y la talla especificada",
      });
    }

    // Verificar si existe la relación calzado-color
    const existeRelacionColor = await CalzadoColor.findOne({
      where: {
        codigoBarras,
        idColor,
      },
    });

    if (!existeRelacionTalla) {
      return res.status(404).json({
        message: "no existe relación entre el calzado y la talla especificada",
      });
    }

    const cantidadAnterior = relacion.cantidad;
    const diferencia = nuevaCantidad - cantidadAnterior;

    const nuevaCapacidadOcupada = estante.capacidadOcupada + diferencia;
    const nuevaCapacidadDisponible = estante.capacidadDisponible - diferencia;

    if (nuevaCapacidadDisponible < 0) {
      return res
        .status(400)
        .json({ message: "no hay suficiente espacio en el estante" });
    }
    // Actualiza estante
    await estante.update({
      capacidadOcupada: nuevaCapacidadOcupada,
      capacidadDisponible: nuevaCapacidadDisponible,
    });
    await relacion.update(req.body, { where: { idCalzadoEstante: id } });
    res.status(200).json("relacion actualizada");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const eliminarRelacion = async (req, res) => {
  try {
    const { id } = req.params;
    const relacion = await CalzadoEstante.findByPk(id);
    if (!relacion) {
      return res.status(404).json({ message: "relacion no encontrada" });
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
    res.status(200).json("relacion eliminada");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const encontrarRelaciones = async (req, res) => {
  try {
    const relaciones = await CalzadoEstante.findAll();
    res.status(200).json(relaciones);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const encontrarRelacion = async (req, res) => {
  try {
    const { id } = req.params;
    const relacion = await CalzadoEstante.findByPk(id);
    res.status(200).json(relacion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getRelacionesDetalladas = async (req, res) => {
  const resultado = await obtenerRelacionesDetalladas();
  if (!resultado.success) {
    return res.status(500).json({ success: false, message: resultado.message });
  }
  res.status(200).json(resultado);
};

const getRelacionesPorEstante = async (req, res) => {
  const { id } = req.params;
  const resultado = await obtenerRelacionesPorEstante(id);
  if (!resultado.success) {
    return res.status(500).json({ success: false, message: resultado.message });
  }
  res.status(200).json(resultado);
};

const getRelacionesPorCalzado = async (req, res) => {
  const { id } = req.params;
  const resultado = await obtenerRelacionesPorCalzado(id);
  if (!resultado.success) {
    return res.status(500).json({ success: false, message: resultado.message });
  }
  res.status(200).json(resultado);
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
