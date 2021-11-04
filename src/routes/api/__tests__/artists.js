const supertest = require('supertest');
const app = require('../../../app');

const request = supertest(app.callback());

describe('Artist API routes', () => {
  beforeAll(async () => {
    await app.context.orm.sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await app.context.orm.sequelize.close();
  });

  describe('GET /api/artists/:id', () => {
    let artist;
    let response;
    const artistData = {
      name: 'Imagine Dragons',
      origin: 'Las Vegas, Nevada, United States',
      genres: 'Rock, Reggae, Alternative/Indie',
      foundedIn: 2009,
      members: 'Dan Reynolds, Ben McKee, Daniel Wayne Sermon, Daniel Platzman',
    };

    const getArtist = (id) => request.get(`/api/artists/${id}`);

    beforeAll(async () => {
      artist = await app.context.orm.artist.create(artistData);
    });

    describe('When passed id corresponds to an existing artist', () => {
      beforeAll(async () => {
        response = await getArtist(artist.id);
      });

      test('responds with 200 status code', () => {
        expect(response.status).toBe(200);
      });

      test('response attributes match saved artist', () => {
        expect(response.body.data.attributes).toMatchObject(artistData);
      });

      test('body matches snapshot', () => {
        expect(response.body).toMatchSnapshot();
      });
    });

    describe('When passed id does not correspond to any author', () => {
      test('responds with 404 status code', async () => {
        response = await getArtist(artist.id * -1);
        expect(response.status).toBe(404);
      });
    });
  });
});
