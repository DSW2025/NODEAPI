const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class Talla extends Model {}

Talla.init(
  {
    idTalla: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    talla: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genero: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "Talla",
    tableName: "talla",
  }
);
module.exports = Talla;
