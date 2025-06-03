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
    contraseña: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
        is: {
          args: /^(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?]).{8,}$/,
        },
      },
    },
    rol: {
      type: DataTypes.ENUM("empleado", "admin"),
      allowNull: false,
      defaultValue: "empleado",
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "Colaborador",
    tableName: "colaborador",
  }
);
module.exports = Colaborador;
