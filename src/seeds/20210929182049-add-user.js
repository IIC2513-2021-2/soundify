const faker = require('faker');
const bcrypt = require('bcrypt');

const PASSWORD_SALT_ROUNDS = 10;

module.exports = {
  up: async (queryInterface) => {
    let usersArray = [];

    usersArray.push({
      firstName: 'Tony',
      lastName: 'Montana',
      email: 'scarface@web.cl',
      password: bcrypt.hashSync('123456', PASSWORD_SALT_ROUNDS),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    usersArray = usersArray.concat(
      [...Array(10)].map(() => (
        {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          email: faker.internet.email(),
          password: bcrypt.hashSync(faker.internet.password(8), PASSWORD_SALT_ROUNDS),
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      )),
    );

    await queryInterface.bulkInsert('users', usersArray);
  },

  down: (queryInterface) => queryInterface.bulkDelete('users', null),
};
