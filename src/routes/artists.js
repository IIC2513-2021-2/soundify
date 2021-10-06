const KoaRouter = require('koa-router');
const { checkAuth } = require('../middlewares/auth');

const router = new KoaRouter();

router.param('id', async (id, ctx, next) => {
  ctx.state.artist = await ctx.orm.artist.findByPk(id);
  if (!ctx.state.artist) return ctx.throw(404);
  return next();
});

router.get('artists.new', '/new', checkAuth, async (ctx) => {
  const artist = ctx.orm.artist.build();
  await ctx.render('artists/new', {
    artist,
    submitArtistPath: ctx.router.url('artists.create'),
    artistsPath: ctx.router.url('artists.list'),
  });
});

router.post('artists.create', '/', checkAuth, async (ctx) => {
  const artist = ctx.orm.artist.build(ctx.request.body);
  try {
    await artist.save({ fields: ['name', 'origin', 'genres', 'formedAt', 'members'] });
    ctx.redirect(ctx.router.url('artists.list'));
  } catch (ValidationError) {
    await ctx.render('artists/new', {
      artist,
      errors: ValidationError.errors,
      submitArtistPath: ctx.router.url('artists.create'),
      artistsPath: ctx.router.url('artists.list'),
    });
  }
});

router.get('artists.list', '/', async (ctx) => {
  // const artists = await ctx.orm.artist.findAll(); \\ CAPSULA QUERIES: EJEMPLO N+1
  // const albums = await Promise.all(
  //  artists.map((artist) => artist.getAlbums())); CAPSULA QUERIES: EJEMPLO N+1
  const artists = await ctx.orm.artist.findAll({ include: ctx.orm.album }); // eager loading
  await ctx.render('artists/index', {
    artists,
    artistPath: (id) => ctx.router.url('artists.show', { id }),
    newArtistPath: ctx.router.url('artists.new'),
  });
});

router.get('artists.show', '/:id', async (ctx) => {
  const { artist } = ctx.state;
  const albums = await artist.getAlbums(); // lazy loading
  await ctx.render('artists/show', {
    artist,
    artistsPath: ctx.router.url('artists.list'),
    albums,
  });
});

module.exports = router;
