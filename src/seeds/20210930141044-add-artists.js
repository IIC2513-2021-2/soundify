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
      foundedIn: 2007,
      members: 'Kevin Parker',
      ...commonData,
    });

    artistsArray.push({
      name: 'Khruangbin',
      origin: 'Houston, Texas, United States',
      genres: 'Psychedelic rock, surf rock, funk, instrumental rock, dub, rock',
      foundedIn: 2009,
      members: 'Laura Lee, Mark Speer, Donald "DJ" Johnson',
      ...commonData,
    });

    await queryInterface.bulkInsert('artists', artistsArray);
  },

  down: (queryInterface) => queryInterface.bulkDelete('artists', null),
};
