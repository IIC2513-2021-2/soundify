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
      type: Sequelize.DATEONLY,
    },
    cover: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 'https://res.cloudinary.com/pedro-herrera/image/upload/v1637791823/istockphoto-134119615-612x612_nouk4g.jpg',
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
