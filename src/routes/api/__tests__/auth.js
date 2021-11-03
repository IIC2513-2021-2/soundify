const supertest = require('supertest');
const app = require('../../../app');

const request = supertest(app.callback());

describe('Auth API routes', () => {
  beforeAll(async () => {
    // Esto bota todas las tablas de la bbdd y sincroniza los modelos
    await app.context.orm.sequelize.sync({ force: true });
  });

  afterAll(async () => {
    // Esto cierra la conexión con sequelize
    await app.context.orm.sequelize.close();
  });

  describe('POST /api/auth', () => {
    let createdUser;
    let response;
    const userData = {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'janedoe@gmail.com',
      password: 'web1234',
    };
    const { email, password } = userData;

    beforeAll(async () => {
      // Creamos un usuario para poder iniciar sesion
      createdUser = await app.context.orm.user.create(userData);
    });

    const postAuth = (body) => request
      .post('/api/auth')
      .set('Content-type', 'application/json')
      .send(body);

    describe('When user credentials are valid', () => {
      beforeAll(async () => {
        response = await postAuth({ email, password });
      });

      test('responds with 200 status code', () => {
        expect(response.status).toBe(200);
      });

      test('returned userId belongs to an existing user in the db', () => {
        expect(response.body.id).toBe(createdUser.id);
      });
    });

    describe('When user credentials are invalid', () => {
      test('when password is incorrect, responds with 401 status code', async () => {
        response = await postAuth({ email, password: 'otherpassword' });
        expect(response.status).toBe(401);
      });

      test('when email is not registered, responds with 404 status code', async () => {
        response = await postAuth({ email: 'unregistered@gmail.com', password });
        expect(response.status).toBe(404);
      });
    });
  });
});
