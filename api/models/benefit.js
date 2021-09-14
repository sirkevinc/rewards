'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Benefit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Benefit.belongsTo(models.Card, { 
        foreignKey: 'cardid',
        as: 'card'
      })
    }
  };
  Benefit.init({
    cardid: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    category: {
      allowNull: false,
      type: DataTypes.STRING
    },
    type: {
      allowNull: false,
      type: DataTypes.STRING
    },
    multiplier: {
      type: DataTypes.FLOAT
    },
    summary: {
      allowNull: false,
      type: DataTypes.STRING
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    modelName: 'Benefit',
  });
  return Benefit;
};