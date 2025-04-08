const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class Rol extends Model {}

Rol.init(
  {
    idrol: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    rol: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "DEV",
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "Rol",
    tableName: "rol",
  }
);
module.exports = Rol;
