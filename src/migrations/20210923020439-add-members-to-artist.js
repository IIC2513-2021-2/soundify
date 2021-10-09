module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('artists', 'members', { type: Sequelize.STRING });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('artists', 'members');
  },
};
