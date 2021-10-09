const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.param('id', async (id, ctx, next) => {
  ctx.state.artist = await ctx.orm.artist.findByPk(id);
  if (!ctx.state.artist) return ctx.throw(404);
  return next();
});

router.get('/', async (ctx) => {
  const artists = await ctx.orm.artist.findAll();
  ctx.body = artists;
});

router.get('/:id', async (ctx) => {
  const { artist } = ctx.state;
  ctx.body = artist;
});

module.exports = router;
