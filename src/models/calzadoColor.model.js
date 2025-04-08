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
    idCalzado: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "calzado",
        key: "idCalzado",
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
