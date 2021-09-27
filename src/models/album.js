module.exports = (sequelize, DataTypes) => {
  const album = sequelize.define('album', {
    artistId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    publishedAt: DataTypes.INTEGER,
    cover: DataTypes.STRING,
  }, {});

  album.associate = function associate(models) {
    // associations can be defined here. This method receives a models parameter.
    this.belongsTo(models.artist);
  };

  return album;
};
