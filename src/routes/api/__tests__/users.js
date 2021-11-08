const supertest = require('supertest');
const app = require('../../../app');

const request = supertest(app.callback());

describe('User API routes', () => {
  beforeAll(async () => {
    await app.context.orm.sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await app.context.orm.sequelize.close();
  });
  describe('POST /api/users', () => {
    const createUser = (body) => request
      .post('/api/users')
      .send(body);

    describe('When user email is invalid', () => {
      const userData = {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'janedoegmail.com',
        password: 'web1234',
      };

      beforeAll(async () => {
        await createUser(userData);
      });

      it('should not have created a user', async () => {
        const countUser = await app.context.orm.user.count();
        expect(countUser).toBe(0);
      });
    });
    describe('When user email is valid ✔️', () => {
      const userData = {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'janedoe@gmail.com',
        password: 'web1234',
      };

      beforeAll(async () => {
        await createUser(userData);
      });

      it('should have created a user', async () => {
        const countUser = await app.context.orm.user.count();
        expect(countUser).toBe(1);
      });
    });
  });
});
