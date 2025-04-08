const {
  Colaborador,
  Color,
  Estante,
  Marca,
  Rol,
  Talla,
  Calzado,
} = require("./index");

module.exports = () => {
  // Calzado (N...1) [N:1] (1...1) Marca
  Calzado.belongsTo(Marca, { foreignKey: "idMarca" });
  Marca.hasMany(Calzado, { foreignKey: "idMarca" });
  // Calzado (N...1) [N:N] (1...N) Estante
  Calzado.belongsToMany(Estante, {
    through: "CalzadoEstante",
    foreignKey: "idCalzado",
  });
  Estante.belongsToMany(Calzado, {
    through: "CalzadoEstante",
    foreignKey: "idEstante",
  });
  // Calzado (N...1) [N:N] (1...N) Color
  Calzado.belongsToMany(Color, {
    through: "CalzadoColor",
    foreignKey: "idCalzado",
  });
  Color.belongsToMany(Calzado, {
    through: "CalzadoEstante",
    foreignKey: "idColor",
  });
};
