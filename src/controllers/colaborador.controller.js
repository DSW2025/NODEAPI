const Colaborador = require("../models/colaborador.model");
const bcrypt = require("bcryptjs");

const crearColaborador = async (req, res) => {
  try {
    const { contraseña, nombres, correoElectronico } = req.body;

    // campos requeridos
    if (!contraseña || !nombres || !correoElectronico) {
      return res
        .status(400)
        .json({ success: false, message: "Faltan campos requeridos" });
    }

    // formato correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correoElectronico)) {
      return res
        .status(400)
        .json({ success: false, message: "Formato de correo inválido" });
    }

    // existencia de correo
    const existe = await Colaborador.findOne({ where: { correoElectronico } });
    if (existe) {
      return res.status(409).json({
        success: false,
        message: "Ya existe un usuario con ese correo",
      });
    }

    // contraseña fuerte
    const regex = /^(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    if (!regex.test(contraseña)) {
      return res.status(400).json({
        success: false,
        message:
          "La contraseña debe tener al menos 8 caracteres y un carácter especial.",
      });
    }

    // 5) Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contraseña, salt);
    req.body.contraseña = hashedPassword;
    const colaborador = await Colaborador.create(req.body);
    res.status(200).json({
      success: true,
      message: "Colaborador creado",
      data: colaborador,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error, no se pudo crear el colaborador",
    });
  }
};

const encontrarColaboradores = async (req, res) => {
  try {
    const colaboradores = await Colaborador.findAll();
    if (!colaboradores) {
      return res
        .status(404)
        .json({ success: false, message: "Colaboradores no encontrados" });
    }
    res.status(200).json({ success: true, data: colaboradores });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error, no se pudo encontrar los colaboradores",
    });
  }
};

const encontrarColaborador = async (req, res) => {
  try {
    const { id } = req.params;
    const colaborador = await Colaborador.findByPk(id);
    if (!colaborador) {
      return res
        .status(404)
        .json({ success: false, message: "Colaborador no encontrado" });
    }
    res.status(200).json({ success: true, data: colaborador });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error, no se pido encontrar el colaborador",
    });
  }
};

const actualizarColaborador = async (req, res) => {
  try {
    const { id } = req.params;
    let { contraseña, nombres, correoElectronico } = req.body;

    // 1) Verificar que el colaborador exista
    const colaborador = await Colaborador.findByPk(id);
    if (!colaborador) {
      return res
        .status(404)
        .json({ success: false, message: "Colaborador no encontrado" });
    }
    const updates = {};
    if (correoElectronico !== undefined) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(correoElectronico)) {
        return res
          .status(400)
          .json({ success: false, message: "Formato de correo inválido" });
      }
      if (correoElectronico !== colaborador.correoElectronico) {
        const existe = await Colaborador.findOne({
          where: { correoElectronico },
        });
        if (existe) {
          return res.status(409).json({
            success: false,
            message: "Ya existe un usuario con ese correo",
          });
        }
      }
      updates.correoElectronico = correoElectronico;
    }
    // 4) Si llega nombres, validar que no esté vacío
    if (nombres !== undefined) {
      if (typeof nombres !== "string" || nombres.trim() === "") {
        return res.status(400).json({
          success: false,
          message: "El campo 'nombres' no puede estar vacío",
        });
      }
      updates.nombres = nombres.trim();
    }

    // 5) Si llega contraseña, validar fuerza y hashearla
    if (contraseña !== undefined) {
      const regex = /^(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?]).{8,}$/;
      if (!regex.test(contraseña)) {
        return res.status(400).json({
          success: false,
          message:
            "La contraseña debe tener al menos 8 caracteres y un carácter especial.",
        });
      }
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(contraseña, salt);
      updates.contraseña = hashed;
    }
    const update = await colaborador.update(updates);
    res.status(200).json({
      success: true,
      message: "Colaborador actualizado",
      data: update,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error, no se pudo actualizar el colaborador",
    });
  }
};

const eliminarColaborador = async (req, res) => {
  try {
    const { id } = req.params;
    const colaborador = await Colaborador.findByPk(id);
    if (!colaborador) {
      return res
        .status(404)
        .json({ success: false, message: "Colaborador no encontrado" });
    }
    await colaborador.destroy();
    res.status(200).json({ success: false, message: "Colaborador eliminado" });
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        message: "Error, no se pudo eliminar el colaborador",
      });
  }
};

module.exports = {
  crearColaborador,
  encontrarColaboradores,
  encontrarColaborador,
  actualizarColaborador,
  eliminarColaborador,
};
