const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class ColaboradorRol extends Model {}

ColaboradorRol.init(
  {
    idColaboradorRol: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    idColaborador: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "colaborador",
        key: "idColaborador",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE"
    },
    idRol: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "rol",
        key: "idRol",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE"
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue : 0
    }
  },
  {
    sequelize,
    timestamps: true,
    modelName: "ColaboradorRol",
    tableName: "colaborador_rol",
  }
);
module.exports = ColaboradorRol;
