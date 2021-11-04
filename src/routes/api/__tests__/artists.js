const supertest = require('supertest');
const { format } = require('date-fns'); // Mencionar esta librería
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
        expect(response.body.data.attributes).toEqual(artistData);
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

  const artistData = {
    name: 'Unknown Mortal Orchestra',
    origin: 'Auckland, New Zealand',
    genres: 'Lofi, Psychedelic Rock, Alternative/Indie',
    foundedIn: 2009,
    members: 'Ruban Nielson, Jake Portrait, Kody Nielson',
  };

  const userData = {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'janedoe@gmail.com',
    password: 'web1234',
  };
  const { email, password } = userData;

  const postAuth = (body) => request
    .post('/api/auth')
    .set('Content-type', 'application/json')
    .send(body);

  describe('POST /api/artists', () => {
    let response;

    beforeAll(async () => {
      await app.context.orm.user.create(userData);
    });

    let token;

    let createArtist = () => request.post('/api/artists');
    describe('When user is not authorized ❌', () => {
      beforeAll(async () => {
        response = await createArtist(artistData);
      });
      it('should return a 401 status code', () => {
        expect(response.status).toBe(401);
      });
      it('should not have created an artist', async () => {
        const artistCount = await app.context.orm.artist.count();
        expect(artistCount).toBe(1);
      });
    });

    createArtist = (body, accessToken) => request
      .post('/api/artists')
      .send(body)
      .set('Authorization', `Bearer ${accessToken}`);

    describe('When user is authorized', () => {
      let invalidArtist = { ...artistData };
      describe('When foundedIn is a string instead of an integer ❌', () => {
        invalidArtist.foundedIn = 'Dos mil nueve';
        beforeAll(async () => {
          const authResponse = await postAuth({ email, password });
          token = authResponse.body.access_token;
          response = await createArtist(invalidArtist, token);
        });
        it('should return a 400 status code', () => {
          expect(response.status).toBe(400);
        });
      });
      describe('When origin is empty ❌', () => {
        invalidArtist = { ...artistData };
        invalidArtist.origin = '';
        beforeAll(async () => {
          const authResponse = await postAuth({ email, password });
          token = authResponse.body.access_token;
          response = await createArtist(invalidArtist, token);
        });
        it('should return a 400 status code', () => {
          expect(response.status).toBe(400);
        });
      });
      describe('When artist is valid ✔️', () => {
        beforeAll(async () => {
          const authResponse = await postAuth({ email, password });
          token = authResponse.body.access_token;
          response = await createArtist(artistData, token);
        });
        it('should return a 201 status code', () => {
          expect(response.status).toBe(201);
        });
        it('should have created an artist', async () => {
          const artistCount = await app.context.orm.artist.count();
          expect(artistCount).toBe(2);
        });
        it('should return the saved artist', () => {
          expect(response.body.data.attributes).toEqual(artistData);
        });
      });
    });
  });

  describe('DELETE /api/artists/:id', () => {
    let response;
    const deleteArtist = (id, accessToken) => request
      .del(`/api/artists/${id}`)
      .set('Authorization', `Bearer ${accessToken}`);
    const albumData = {
      name: 'Multi-love',
      artistId: 1,
      publishedAt: format(new Date('2015, 01, 30'), 'yyyy-MM-dd'),
      cover: 'https://m.media-amazon.com/images/I/81Dakro4ZwL._SL1400_.jpg)',
    };
    let token;
    beforeAll(async () => {
      await app.context.orm.album.create(albumData);
      const authResponse = await postAuth({ email, password });
      token = authResponse.body.access_token;
    });
    describe("When artist's id is valid, artist has one album, and user is authenticated ✔️", () => {
      beforeAll(async () => {
        response = await deleteArtist(1, token);
      });
      it('should shorten the artists list', async () => {
        const artistCount = await app.context.orm.artist.count();
        expect(artistCount).toBe(1);
      });
      it('should shorten the albums list', async () => {
        const albumCount = await app.context.orm.album.count();
        expect(albumCount).toBe(0);
      });
      it('should return a 204 status code', () => {
        expect(response.status).toBe(204);
      });
    });
  });
});
