const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class Estante extends Model {}

Estante.init(
  {
    idEstante: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    localizacion: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    capacidadMaxima: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate : {
        isPositive(value) {
          if (value <= 0.0) {
            throw new Error("sin valores negativos");
          }
        },
      }
    },
    capacidadOcupada: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate : {
        isPositive(value) {
          if (value < 0.0) {
            throw new Error("sin valores negativos");
          }
        },
      }
    },
    capacidadDisponible: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate : {
        isPositive(value) {
          if (value < 0.0) {
            throw new Error("sin valores negativos");
          }
        },
      }
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "Estante",
    tableName: "estante",
  }
);
module.exports = Estante;
