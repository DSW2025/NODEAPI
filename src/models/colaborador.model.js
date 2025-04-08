const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class Colaborador extends Model {}

Colaborador.init(
  {
    idColaborador: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nombres: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellidos: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    correoElectronico: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    contraseña : {
      type : DataTypes.STRING,
      allowNull : true,
      defaultValue : "Equipo#3"
    }
  },
  {
    sequelize,
    timestamps: false,
    modelName: "Colaborador",
    tableName: "colaborador",
  }
);
module.exports = Colaborador;
