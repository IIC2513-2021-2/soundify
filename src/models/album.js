const {
  Model,
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
      this.belongsTo(models.artist, { onDelete: 'CASCADE' });
    }
  }
  album.init({
    artistId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    publishedAt: {
      type: DataTypes.DATEONLY,
    },
    cover: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'album',
  });
  return album;
};
