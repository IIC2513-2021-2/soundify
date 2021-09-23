const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('artists.new', '/new', async (ctx) => {
  await ctx.render('artists/new');
});

module.exports = router;
