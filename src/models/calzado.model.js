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
  },
  {
    sequelize,
    timestamps: false,
    modelName: "Calzado",
    tableName: "calzado",
  }
);
module.exports = Calzado;
