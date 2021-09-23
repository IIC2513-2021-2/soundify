const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('artists.new', '/new', async (ctx) => {
  await ctx.render('artists/new', {
    submitArtistPath: ctx.router.url('artists.create'),
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
  });
});

module.exports = router;
