const faker = require('faker');

module.exports = {
  up: async (queryInterface) => {
    let usersArray = [];

    usersArray.push({
      firstName: 'Tony',
      lastName: 'Montana',
      email: 'scarface@web.cl',
      password: '123456',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    usersArray = usersArray.concat(
      [...Array(10)].map(() => (
        {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          email: faker.internet.email(),
          password: faker.internet.password(8),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ))
    );

    await queryInterface.bulkInsert('users', usersArray);
  },

  down: (queryInterface) => queryInterface.bulkDelete('users', null),
};
