module.exports = (sequelize, DataTypes) => {
  const album = sequelize.define('album', {
    id_artist: DataTypes.INTEGER,
    name: DataTypes.STRING,
    publishedAt: DataTypes.INTEGER,
    cover: DataTypes.STRING,
  }, {});

  album.associate = function associate() {
    // associations can be defined here. This method receives a models parameter.
  };

  return album;
};
