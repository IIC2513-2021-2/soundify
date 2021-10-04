const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('index', '/', async (ctx) => {
  await ctx.render('index', {
    artistsPath: ctx.router.url('artists.list'),
    albumsPath: ctx.router.url("albums.list")
  });
});

router.get('index.about', 'about', async (ctx) => {
  const contributors = [
    {
      name: 'Moisés Retamal',
      username: 'meretamal',
    },
    {
      name: 'Michel Magna',
      username: 'Michelmagna',
    },
    {
      name: 'Sebastián Vicencio',
      username: 'sivicencio',
    },
    {
      name: 'Pablo Kipreos',
      username: 'Pablok98',
    },
    {
      name: 'Pedro Herrera',
      username: 'pedroherreraj',
    },
    {
      name: 'José Antonio Castro',
      username: 'Baelfire18',
    },
  ];
  await ctx.render('about', { contributors });
});

module.exports = router;
