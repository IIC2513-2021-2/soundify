const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.param('id', async (id, ctx, next) => {
  ctx.state.artist = await ctx.orm.artist.findByPk(id);
  if (!ctx.state.artist) return ctx.throw(404);
  return next();
});

router.get('artists.new', '/new', async (ctx) => {
  await ctx.render('artists/new', {
    submitArtistPath: ctx.router.url('artists.create'),
    artistsPath: ctx.router.url('artists.list'),
  });
});

router.post('artists.create', '/', async (ctx) => {
  const artist = ctx.orm.artist.build(ctx.request.body);
  await artist.save({ fields: ['name', 'origin', 'genres', 'formedAt', 'members'] });
  ctx.redirect(ctx.router.url('authors.new'));
});

router.get('artists.list', '/', async (ctx) => {
  const artists = await ctx.orm.artist.findAll();
  await ctx.render('artists/index', {
    artists,
    artistPath: (id) => ctx.router.url('artists.show', { id }),
    newArtistPath: ctx.router.url('artists.new'),
  });
});

router.get('artists.show', '/:id', async (ctx) => {
  const { artist } = ctx.state;
  await ctx.render('artists/show', {
    artist,
    artistsPath: ctx.router.url('artists.list'),
  });
});

module.exports = router;
