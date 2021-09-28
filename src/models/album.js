'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  album.init({
    artistId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    publishedAt: DataTypes.DATEONLY,
    cover: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'album',
  });
  return album;
};
