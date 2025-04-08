const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class CalzadoTalla extends Model {}

CalzadoTalla.init(
  {
    idCalzadoTalla: {
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
    idTalla: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "talla",
        key: "idTalla",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE"
    }
  },
  {
    sequelize,
    timestamps: false,
    modelName: "CalzadoTalla",
    tableName: "calzado_talla",
  }
);
module.exports = CalzadoTalla;
