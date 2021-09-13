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
    static associate(models) {
      // define association here
      models.User.belongsToMany(models.Card, { through: User_Card });
      models.Card.belongsToMany(models.User, { through: User_Card });
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