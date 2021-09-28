module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('albums', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    artistId: {
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
    publishedAt: {
      type: Sequelize.INTEGER,
    },
    cover: {
      type: Sequelize.STRING,
    },

    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('albums'),
};
