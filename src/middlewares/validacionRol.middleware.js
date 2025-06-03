// middlewares/rol.middleware.js
/**
 * autorizarRoles(...) devuelve un middleware que revisa si el usuario logueado
 * (req.user.rol) está incluido en los rolesPermitidos. Si no, responde 403.
 *
 * @param  {...string} rolesPermitidos — lista de roles válidos para esta ruta
 * @returns function(req, res, next)
 */
function autorizarRoles(...rolesPermitidos) {
  return (req, res, next) => {
    // Suponemos que validarToken ya guardó en `req.user` el payload del JWT,
    // incluyendo `req.user.rol`.
    if (!req.user || !req.user.rol) {
      return res
        .status(401)
        .json({ message: "No autenticado" });
    }

    const rolUsuario = req.user.rol;
    if (!rolesPermitidos.includes(rolUsuario)) {
      return res
        .status(403)
        .json({ message: "Acceso denegado: rol insuficiente" });
    }
    next();
  };
}

module.exports = { autorizarRoles };
