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
  ctx.redirect(ctx.router.url('artists.list'));
});

router.get('artists.list', '/', async (ctx) => {
  // const artists = await ctx.orm.artist.findAll();
  // const albums = await Promise.all(artists.map((artist) => artist.getAlbums()));
  const artists = await ctx.orm.artist.findAll({ include: ctx.orm.album });
  console.log(artists[0].albums[0]);
  await ctx.render('artists/index', {
    artists,
    // albums,
    artistPath: (id) => ctx.router.url('artists.show', { id }),
    newArtistPath: ctx.router.url('artists.new'),
  });
});

router.get('artists.show', '/:id', async (ctx) => {
  const { artist } = ctx.state;
  // const albums = await ctx.orm.album.findAll({ where: { artistId: artist.id } });
  const albums = await artist.getAlbums();
  await ctx.render('artists/show', {
    artist,
    albums,
    artistsPath: ctx.router.url('artists.list'),
  });
});

module.exports = router;
