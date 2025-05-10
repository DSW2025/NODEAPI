const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class CalzadoColor extends Model {}

CalzadoColor.init(
  {
    idCalzadoColor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    codigoBarras: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: "calzado",
        key: "codigoBarras",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE"
    },
    idColor: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "color",
        key: "idColor",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE"
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "CalzadoColor",
    tableName: "calzado_color",
  }
);
module.exports = CalzadoColor;
