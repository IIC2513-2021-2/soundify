const supertest = require('supertest');
const app = require('../../../app');

const request = supertest(app.callback());

describe('Artist API routes', () => {
  beforeAll(async () => {
    // Esto bota todas las tablas de la bbdd y sincroniza los modelos
    await app.context.orm.sequelize.sync({ force: true });
  });

  afterAll(async () => {
    // Esto cierra la conexión con sequelize después de que corren todos los tests de este suite
    await app.context.orm.sequelize.close();
  });

  describe('GET /api/artists/:id', () => {
    // Definimos las sig variables acá arriba para que sea accesible a todo el scope del suite
    // Definimos la variable que será la instancia del artista en la bbdd
    let artist;

    // Definimos la variable response que luego recibira la response del request del endpoint
    let response;
    const artistData = {
      name: 'Imagine Dragons',
      origin: 'Las Vegas, Nevada, United States',
      genres: 'Rock, Reggae, Alternative/Indie',
      foundedIn: 2009,
      members: 'Dan Reynolds, Ben McKee, Daniel Wayne Sermon, Daniel Platzman',
    };

    // Guardamos la funcion que realiza el request GET
    const getArtist = (id) => request.get(`/api/artists/${id}`);

    // Antes de que corran los tests de esta suite, se
    // crea en la bbdd el artista con los datos de artistData
    beforeAll(async () => {
      artist = await app.context.orm.artist.create(artistData);
    });

    describe('When passed id corresponds to an existing artist', () => {
      // Antes de ejecutar los tests, se hace un request y se guarda en la variable response
      beforeAll(async () => {
        response = await getArtist(artist.id);
      });

      test('responds with 200 status code', () => {
        expect(response.status).toBe(200);
      });

      test('response attributes match saved artist', () => {
        expect(response.body.data.attributes).toMatchObject(artistData);
      });

      // Aca podemos explicar la importancia del snapshot
      // mostramos un ejemplo cambiando la ruta
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
