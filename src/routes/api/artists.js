const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('/', async (ctx) => {
  const artists = await ctx.orm.artist.findAll();
  ctx.body = artists;
});

module.exports = router;
