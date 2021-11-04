module.exports = {
  up: async (queryInterface) => {
    await queryInterface.renameColumn('artists', 'formedAt', 'foundedIn');
  },

  down: async (queryInterface) => {
    await queryInterface.renameColumn('artists', 'foundedIn', 'formedAt');
  },
};
