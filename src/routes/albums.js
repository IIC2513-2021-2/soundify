const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.param('id', async (id, ctx, next) => {
  ctx.state.album = await ctx.orm.album.findByPk(id);
  if (!ctx.state.album) return ctx.throw(404);
  return next();
});

router.get('albums.new', '/new', async (ctx) => {
  const artistList = await ctx.orm.artist.findAll()

  await ctx.render('albums/new', {
    submitAlbumPath: ctx.router.url('albums.create'),
    albumPath: ctx.router.url('albums.list'),
    artistList,
  });
});

router.post('albums.create', '/', async (ctx) => {
  const album = ctx.orm.album.build(ctx.request.body);
  await album.save({ fields: ['name', 'artistId', 'publishedAt', 'cover'] });
  ctx.redirect(ctx.router.url('artists.show', {id: album.artistId}));
});

router.get('albums.list', '/', async (ctx) => {
  const albums = await ctx.orm.album.findAll();
  const artistList = await ctx.orm.artist.findAll()
  await ctx.render('albums/index', {
    albums,
    artistList,
    albumPath: (id) => ctx.router.url('albums.show', { id }),
    newAlbumPath: ctx.router.url('albums.new'),
  });
});

router.get('albums.show', '/:id', async (ctx) => {
  const { album } = ctx.state;
  await ctx.render('albums/show', {
    album,
    albumsPath: ctx.router.url('albums.list'),
  });
});

module.exports = router;
