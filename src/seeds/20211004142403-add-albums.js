const { QueryTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    const albumsArray = [];

    const commonData = {
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    async function findArtistIdByName(name) {
      const artists = await queryInterface.sequelize.query(
        'SELECT "id" FROM "artists" WHERE "artists"."name" = ?',
        {
          replacements: [name],
          type: QueryTypes.SELECT,
        },
      );

      const [artistId] = artists.map(({ id }) => id);
      return artistId;
    }

    let artistId = await findArtistIdByName('Tame Impala');

    if (artistId) {
      albumsArray.push({
        name: 'InnerSpeaker',
        publishedAt: '2010-05-21',
        cover: 'https://img.discogs.com/vXs09GMxHzOugRyYyN2M-P_p3WI=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-2402720-1547448092-2132.jpeg.jpg',
        artistId,
      });

      albumsArray.push({
        name: 'Lonerism',
        publishedAt: '2012-10-05',
        cover: 'https://img.discogs.com/TQGqHoBO0Zd0DdMXKhl73weJdRM=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-6281154-1415488872-1632.jpeg.jpg',
        artistId,
      });

      albumsArray.push({
        name: 'Currents',
        publishedAt: '2015-07-17',
        cover: 'https://img.discogs.com/TH3722IESsHH9YyVXkLFhgTRDyA=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-7268943-1437635726-4759.jpeg.jpg',
        artistId,
      });

      albumsArray.push({
        name: 'The Slow Rush',
        publishedAt: '2020-02-14',
        cover: 'https://img.discogs.com/S5KrNXLXyvdAML-w_2vmHftW914=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-14783822-1581621221-8754.jpeg.jpg',
        artistId,
      });
    }

    artistId = await findArtistIdByName('Khruangbin');

    if (artistId) {
      albumsArray.push({
        name: 'The Universe Smiles upon You',
        publishedAt: '2015-11-06',
        cover: 'https://img.discogs.com/hrGokqg3_m8ACG94kAUFtCsZiCc=/fit-in/500x500/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-7695323-1446910832-1238.jpeg.jpg',
        artistId,
      });

      albumsArray.push({
        name: 'Con Todo el Mundo',
        publishedAt: '2018-01-26',
        cover: 'https://img.discogs.com/ad9oJYgp7Usrr9Lmax6U4CGEwgc=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-13090298-1547893744-2223.jpeg.jpg',
        artistId,
      });

      albumsArray.push({
        name: 'Mordechai',
        publishedAt: '2020-06-26',
        cover: 'https://img.discogs.com/OX26JtPyot0RdcNDxbBdHBsJCXY=/fit-in/600x590/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-15511221-1593462255-4290.jpeg.jpg',
        artistId,
      });
    }

    await queryInterface.bulkInsert(
      'albums',
      albumsArray.map((album) => ({ ...album, ...commonData })),
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('albums', null);
  }
};
