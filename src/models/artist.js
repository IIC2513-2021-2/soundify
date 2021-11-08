const {
  Model,
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
  }
  artist.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    origin: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    genres: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    foundedIn: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1700,
        max: 2021,
      },
    },
    members: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'artist',
  });
  return artist;
};
