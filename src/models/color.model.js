const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class Color extends Model {}

Color.init(
  {
    idColor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "Color",
    tableName: "color",
  }
);
module.exports = Color;
