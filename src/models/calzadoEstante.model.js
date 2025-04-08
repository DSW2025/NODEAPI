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
    idEstante: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "estante",
        key: "idEstante",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE"
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue : 0
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
