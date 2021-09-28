const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('/', async (ctx) => {
  await ctx.render('index', {
    artistsPath: ctx.router.url('artists.list'),
    albumsPath: ctx.router.url("albums.list")
  });
});

module.exports = router;
