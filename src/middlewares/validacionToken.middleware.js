const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../config");

function validarToken(req, res, next) {
  // Obtener token desde la cookie (más seguro que desde headers)
  const { token } = req.cookies;

  // Si no hay token, rechaza la solicitud
  if (!token) {
    return res
      .status(401)
      .json({ message: "Acceso denegado. No se proporcionó token." });
  }

  try {
    // Verificar el token
    const verificado = jwt.verify(token, TOKEN_SECRET);

    // Adjuntar los datos del token a la solicitud para usarlos más adelante
    req.user = verificado;

    // Pasar al siguiente middleware o controlador
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token inválido o expirado." });
  }
}

module.exports = { validarToken };
