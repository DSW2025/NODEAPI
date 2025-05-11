const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../config");

function validarToken(req, res, next) {
  // 1. Intenta obtener el token desde la cookie
  let token = req.cookies?.token;
  // 2. Si no hay token en cookie, intenta obtenerlo del header Authorization
  if (!token && req.headers.authorization) {
    const authHeader = req.headers.authorization;
    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }
  }
  // 3. Si no hay token en ningún lado, rechaza
  if (!token) {
    return res
      .status(401)
      .json({ message: "acceso denegado" });
  }

  try {
    const verificado = jwt.verify(token, TOKEN_SECRET);
    req.user = verificado;
    next(); // sigue al siguiente middleware o ruta
  } catch (error) {
    return res
      .status(403)
      .json({ message: "toekn inválido o expirado." });
  }
}

module.exports = { validarToken };
