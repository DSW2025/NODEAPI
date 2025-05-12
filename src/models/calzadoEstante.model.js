const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class CalzadoEstante extends Model {}

CalzadoEstante.init(
  {
    idCalzadoEstante: {
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
      onUpdate: "CASCADE",
    },
    idEstante: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "estante",
        key: "idEstante",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    },
    idTalla: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "talla",
        key: "idTalla",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    },
    idColor: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "color",
        key: "idColor",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "CalzadoEstante",
    tableName: "calzado_estante",
  }
);
module.exports = CalzadoEstante;
