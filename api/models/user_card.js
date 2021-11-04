'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Card }) {
      // define association here
      User.belongsToMany(Card, { through: User_Card });
      Card.belongsToMany(User, { through: User_Card });
    }
  };
  User_Card.init({
    userid: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'userid'
      }
    },
    cardid: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Cards',
        key: 'cardid'
      }
    },
  }, {
    sequelize,
    modelName: 'User_Card',
  });
  return User_Card;
};