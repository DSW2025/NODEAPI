const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class Calzado extends Model {}

Calzado.init(
  {
    codigoBarras: {
      primaryKey: true,
      type: DataTypes.STRING,
      allowNull: false,
    },
    idMarca: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "marca",
        key: "idMarca",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    },
    modelo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    costo: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
      validate: {
        isPositive(value) {
          if (value < 0.0) {
            throw new Error("Sin valores negativos");
          }
        },
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "Calzado",
    tableName: "calzado",
  }
);
module.exports = Calzado;
