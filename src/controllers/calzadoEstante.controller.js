const CalzadoEstante = require("../models/calzadoEstante.model");
const { Estante, Calzado } = require("../models");

const crearRelacion = async (req, res) => {
  try {
    const relacion = await CalzadoEstante.create(req.body);

    const { idEstante, codigoBarras, cantidad } = req.body;

    const estante = await Estante.findByPk(idEstante);
    const calzado = await Calzado.findByPk(codigoBarras);

    if (!estante) {
      return res.status(404).json({ message: "estante no encontrado" });
    }
    if (!calzado) {
      return res.status(404).json({ message: "calzado no encontrado" });
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
    if (!relacion) {
      return res.status(404).json({ message: "relacion no encontrada" });
    }

    const estante = await Estante.findByPk(relacion.idEstante);
    if (!estante) {
      return res.status(404).json({ message: "estante no encontrado" });
    }

    const calzado = await Calzado.findByPk(relacion.codigoBarras);
    if (!calzado) {
      return res.status(404).json({ message: "calzado no encontrado" });
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

module.exports = {
  crearRelacion,
  encontrarRelaciones,
  encontrarRelacion,
  actualizarRelacion,
  eliminarRelacion,
};
