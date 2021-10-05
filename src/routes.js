const KoaRouter = require('koa-router');

const index = require('./routes/index');
const artists = require('./routes/artists');
const albums = require('./routes/albums');
const albumsForArtists = require('./routes/albumsForArtists');
const users = require('./routes/users');
const session = require('./routes/session');

const router = new KoaRouter();

router.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    switch (err.status) {
      case 401:
        ctx.app.emit('error', err, ctx);
        ctx.redirect(ctx.router.url('session.new'));
        break;
      default:
        throw err;
    }
  }
});

router.use(async (ctx, next) => {
  if (ctx.session.currentUserId) {
    ctx.state.currentUser = await ctx.orm.user.findByPk(ctx.session.currentUserId);
  }
  await next();
});

router.use(async (ctx, next) => {
  ctx.state.paths = {
    index: ctx.router.url('index'),
    users: ctx.router.url('users.list'),
    artists: ctx.router.url('artists.list'),
    albums: ctx.router.url('albums.list'),
    about: ctx.router.url('index.about'),
    newSession: ctx.router.url('session.new'),
    destroySession: ctx.router.url('session.destroy'),
    profile: ctx.session.currentUserId && ctx.router.url('users.show', { id: ctx.session.currentUserId }),
  };

  await next();
});

router.use('/', index.routes());
router.use('/artists', artists.routes());
router.use('/albums', albums.routes());
router.use('/artists/:artistId/albums', albumsForArtists.routes());
router.use('/users', users.routes());
router.use('/session', session.routes());

module.exports = router;
