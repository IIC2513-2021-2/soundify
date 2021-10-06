module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addConstraint('albums', {
      fields: ['artistId'],
      type: 'foreign key',
      name: 'albums_artistId_fkey',
      references: {
        table: 'artists',
        field: 'id',
      },
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeConstraint('albums', 'albums_artistId_fkey');
  },
};
