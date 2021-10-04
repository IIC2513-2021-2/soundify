const KoaRouter = require('koa-router');

const index = require('./routes/index');
const artists = require('./routes/artists');
const albums = require('./routes/albums');
const albumsForArtists = require('./routes/albumsForArtists');
const users = require('./routes/users');

const router = new KoaRouter();

router.use(async (ctx, next) => {
  ctx.state.paths = {
    index: ctx.router.url('index'),
    users: ctx.router.url('users.list'),
    artists: ctx.router.url('artists.list'),
    albums: ctx.router.url('albums.list'),
    about: ctx.router.url('index.about'),
  };

  await next();
});

router.use('/', index.routes());
router.use('/artists', artists.routes());
router.use('/albums', albums.routes());
router.use('/artists/:artistId/albums', albumsForArtists.routes());
router.use('/users', users.routes());

module.exports = router;
