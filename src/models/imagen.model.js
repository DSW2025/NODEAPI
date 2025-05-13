const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class Imagen extends Model {}

Imagen.init(
  {
    idImagen: {
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
    nombreArchivo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "Imagen",
    tableName: "imagen",
  }
);
module.exports = Imagen;
