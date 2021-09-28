'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class artist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.album);
    }
  };
  artist.init({
    name: DataTypes.STRING,
    origin: DataTypes.STRING,
    genres: DataTypes.STRING,
    formedAt: DataTypes.INTEGER,
    members: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'artist',
  });
  return artist;
};