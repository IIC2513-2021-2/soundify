const supertest = require('supertest');
const { format } = require('date-fns');
const app = require('../../../app');

const request = supertest(app.callback());

describe('Album API routes', () => {
  beforeAll(async () => {
    await app.context.orm.sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await app.context.orm.sequelize.close();
  });

  describe('POST /api/albums', () => {
    let response;

    const userData = {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'janedoe@gmail.com',
      password: 'web1234',
    };
    const { email, password } = userData;
    beforeAll(async () => {
      await app.context.orm.user.create(userData);
    });

    let token;

    const postAuth = (body) => request
      .post('/api/auth')
      .set('Content-type', 'application/json')
      .send(body);

    const artistData = {
      name: 'Unknown Mortal Orchestra',
      origin: 'Auckland, New Zealand',
      genres: 'Lofi, Psychedelic Rock, Alternative/Indie',
      foundedIn: 2009,
      members: 'Ruban Nielson, Jake Portrait, Kody Nielson',
    };
    beforeAll(async () => {
      await app.context.orm.artist.create(artistData);
      const authResponse = await postAuth({ email, password });
      token = authResponse.body.access_token;
    });

    describe('When publishedAt is a date that does not exist, album is not created ❌', () => {
      const albumData = {
        name: 'Multi-love',
        artistId: 1,
        publishedAt: format(new Date('2015, 01, 30'), 'yyyy-MM-dd'),
        cover: 'https://m.media-amazon.com/images/I/81Dakro4ZwL._SL1400_.jpg)',
      };

      const createAlbum = (body) => request
        .post('/api/albums')
        .send(body)
        .set('Authorization', `Bearer ${token}`);

      beforeAll(async () => {
        response = await createAlbum(albumData);
      });

      it('should return a 201 status code', () => {
        expect(response.status).toBe(201);
      });
      it('should return the saved album', () => {
        expect(response.body.data.attributes).toEqual(albumData);
      });
    });
  });
});
