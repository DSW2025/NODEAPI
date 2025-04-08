const jwt = require("jsonwebtoken");
const Colaborador = require("../models/colaborador.model");
const bcrypt = require("bcryptjs");
const { TOKEN_SECRET } = require("../config");

const generar = async (req, res) => {
  const { correoElectronico, contraseña } = req.body;
  try {
    const colaborador = await Colaborador.findOne({
      where: { correoElectronico },
    });
    if (!colaborador) {
      return res.status(400).json({ mensaje: "Colaborador no encontrado" });
    }
    const valida = await bcrypt.compare(contraseña, colaborador.contraseña);
    if (!valida) {
      return res.status(400).json({ mensaje: "Contraseña incorrecta" });
    }
    jwt.sign(
      { id: colaborador.idColaborador, correoElectronico: colaborador.correoElectronico },
      TOKEN_SECRET,
      { expiresIn: "1d" }, // Token expira en 1 dia
      (err, token) => {
        if (err) {
          return res.status(500).json({ mensaje: "Error al generar el token" });
        }

        res.cookie("token", token, {
          httpOnly: true, // Impide que el token sea accesible desde JavaScript del navegador
          secure: process.env.NODE_ENV === "production", // Solo se envía en HTTPS si está en producción
          maxAge: 24 * 60 * 60 * 1000, // 1 día
          sameSite: "Strict", // Asegura que la cookie solo se envíe en solicitudes del mismo sitio
        });
        res.json({ mensaje: "Autenticado" });
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const remover = async (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0), // Fecha de expiración en el pasado
    httpOnly: true, // Seguridad: la cookie no será accesible desde JavaScript
    secure: process.env.NODE_ENV === "production", // Solo en HTTPS si estás en producción
    sameSite: "Strict", // Asegura que la cookie solo se envíe en solicitudes del mismo sitio
  });

  return res.status(200).json({ message: "Sesion cerrada correctamente" });
};

module.exports = {
  generar,
  remover,
};
