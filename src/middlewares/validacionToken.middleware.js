const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../config");

function validarToken(req, res, next) {
  let token = req.cookies?.token;
  if (!token && req.headers.authorization) {
    const authHeader = req.headers.authorization;
    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }
  }
  if (!token) {
    return res
      .status(401)
      .json({ message: "Acceso denegado" });
  }

  try {
    const verificado = jwt.verify(token, TOKEN_SECRET);
    req.user = verificado;
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Token inválido o expirado." });
  }
}

module.exports = { validarToken };
