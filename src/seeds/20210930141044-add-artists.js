'use strict';

module.exports = {
  up: async (queryInterface) => {
    const artistsArray = [];

    const commonData = {
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    artistsArray.push({
      name: 'Tame Impala',
      origin: 'Perth, Australia',
      genres: 'Psychedelic pop, psychedelic rock, disco, synth-pop, neo-psychedelia',
      formedAt: 2007,
      members: 'Kevin Parker',
      ...commonData,
    });
    
    artistsArray.push({
      name: 'Khruangbin',
      origin: 'Houston, Texas, United States',
      genres: 'Psychedelic rock, surf rock, funk, instrumental rock, dub, rock',
      formedAt: 2009,
      members: 'Laura Lee, Mark Speer, Donald "DJ" Johnson',
      ...commonData,
    });

    await queryInterface.bulkInsert('artists', artistsArray);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('artists', null);
  }
};
