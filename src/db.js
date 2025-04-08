const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("dakar", "root", "Ll12345%$_#123", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
  logging: false, // Evita mostrar consultas SQL en consola
  define: {
    freezeTableName: true, // Evita que Sequelize pluralice los nombres de las tablas
  },
});

module.exports = sequelize;
