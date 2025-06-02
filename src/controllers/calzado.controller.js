const Calzado = require("../models/calzado.model");
const {
  opcionesDatos,
  calzadoImagen,
  calzadoColor,
  calzadoTalla,
} = require("../services/calzado.service");

const crearCalzado = async (req, res) => {
  try {
    const calzado = await Calzado.create(req.body);
    res
      .status(200)
      .json({ success: true, message: "Calzado creado", data: calzado });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Error, no se pudo crear el calzado" });
  }
};

const encontrarCalzados = async (req, res) => {
  try {
    const calzados = await Calzado.findAll();
    if (!calzados) {
      return res
        .status(404)
        .json({ success: false, message: "Calzados no encontrados" });
    }
    res.status(200).json({ success: true, data: calzados });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error, no se pudo encontrar los los calzados",
    });
  }
};

const encontrarCalzado = async (req, res) => {
  try {
    const { id } = req.params;
    const calzado = await Calzado.findByPk(id);
    if (!calzado) {
      return res.status(404).json({
        success: false,
        message: "Calzado no encontrado",
      });
    }
    res.status(200).json(calzado);
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Error, no se encontrar el calzado" });
  }
};

const actualizarCalzado = async (req, res) => {
  try {
    const { id } = req.params;
    const calzado = await Calzado.findByPk(id);
    if (!calzado) {
      return res
        .status(404)
        .json({ success: false, message: "Calzado no encontrado" });
    }
    await calzado.update(req.body);
    res.status(200).json({ success: true, message: "Calzado actualizado" });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error, no se pudo actualizar el calzado",
    });
  }
};

const eliminarCalzado = async (req, res) => {
  try {
    const { id } = req.params;
    const calzado = await Calzado.findByPk(id);
    if (!calzado) {
      return res
        .status(404)
        .json({ success: false, message: "Calzado no encontrado" });
    }
    await calzado.destroy();
    res.status(200).json({ success: true, message: "Calzado eliminado" });
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        message: "Error, no se pudo eliminar el calzado",
      });
  }
};

const getDatos = async (req, res) => {
  try {
    const { id } = req.params;
    const calzado = await opcionesDatos(id);
    if (!calzado) {
      return res
        .status(404)
        .json({ success: false, message: "Calzado no encontrado" });
    }
    res.json({ success: true, data: calzado });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `No se pudieron obtener los datos del calzado ${id}`,
    });
  }
};

const getImagen = async (req, res) => {
  try {
    const { id } = req.params;
    const calzado = await calzadoImagen(id);
    if (!calzado) {
      return res
        .status(404)
        .json({ success: false, message: "Calzado no encontrado" });
    }

    res.json({ success: true, data: calzado });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error al obtener la imagen del calzado ${id}`,
    });
  }
};

const getColores = async (req, res) => {
  try {
    const { id } = req.params;
    const calzado = await calzadoColor(id);
    if (!calzado) {
      return res
        .status(404)
        .json({ success: false, message: "Calzado no encontrado" });
    }

    res.json({ success: true, data: calzado });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `No se pudo obtener la lista de colores del calzado ${id}`,
    });
  }
};

const getTallas = async (req, res) => {
  try {
    const { id } = req.params;
    const calzado = await calzadoTalla(id);
    if (!calzado) {
      return res
        .status(404)
        .json({ success: false, message: "Calzado no encontrado" });
    }

    res.json({ success: true, data: calzado });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error al obtener la lista de tallas del calzado ${id}`,
    });
  }
};

module.exports = {
  crearCalzado,
  encontrarCalzados,
  encontrarCalzado,
  actualizarCalzado,
  eliminarCalzado,

  getDatos,
  getImagen,
  getColores,
  getTallas,
};
