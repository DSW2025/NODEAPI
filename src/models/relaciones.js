const {
  Color,
  Estante,
  Marca,
  Talla,
  Calzado,
  Imagen,
} = require("./index");

module.exports = () => {
  // Calzado (N...1) [N:1] (1...1) Marca
  Calzado.belongsTo(Marca, { foreignKey: "idMarca" });
  Marca.hasMany(Calzado, { foreignKey: "idMarca" });

  // Calzado (N...1) [N:N] (1...N) Estante
  Calzado.belongsToMany(Estante, {
    through: "CalzadoEstante",
    foreignKey: "codigoBarras",
    as: "estantes" // en lugar de llamar a la relacion como la tabla intermedia 'CalzadoEstante', recibe un alias 'estantes'
  });
  Estante.belongsToMany(Calzado, {
    through: "CalzadoEstante",
    foreignKey: "idEstante",
    as: "calzados" // en lugar de llamar a la relacion como la tabla intermedia 'CalzadoEstante', recibe un alias 'calzados'
  });

    // Calzado (N...1) [N:N] (1...N) Talla
  Calzado.belongsToMany(Talla, {
    through: "CalzadoTalla",
    foreignKey: "codigoBarras",
    as: "tallas" // en lugar de llamar a la relacion como la tabla intermedia 'CalzadoEstante', recibe un alias 'estantes'
  });
  Talla.belongsToMany(Calzado, {
    through: "CalzadoTalla",
    foreignKey: "idTalla",
    as: "calzados" // en lugar de llamar a la relacion como la tabla intermedia 'CalzadoEstante', recibe un alias 'calzados'
  });

  // Calzado (N...1) [N:N] (1...N) Color
  Calzado.belongsToMany(Color, {
    through: "CalzadoColor",
    foreignKey: "codigoBarras",
    as: "colores"
  });
  Color.belongsToMany(Calzado, {
    through: "CalzadoColor",
    foreignKey: "idColor",
    as: "calzados"
  });

  // Calzado (1...1) [1:1] (1...1) Imagen
  Calzado.hasOne(Imagen, {
    foreignKey: "codigoBarras",
    as: "imagen",
  });
  Imagen.belongsTo(Calzado, {
    foreignKey: "codigoBarras",
    as: "calzado"
  });
};
