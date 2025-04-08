const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class Marca extends Model {}

Marca.init(
  {
    idMarca: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    marca: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "Marca",
    tableName: "marca",
  }
);
module.exports = Marca;
