const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class Calzado extends Model {}

Calzado.init(
  {
    idCalzado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    idMarca : {
        type : DataTypes.INTEGER,
        allowNull : true,
        references : {
            model : "marca",
            key : "idMarca"
        },
        onDelete : "SET NULL",
        onUpdate : "CASCADE"
    },
    calzado : {
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
