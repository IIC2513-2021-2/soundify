const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('session.new', '/new', async (ctx) => {
  await ctx.render('session/new', {
    submitPath: ctx.router.url('session.create'),
    });
  }
);

router.post('session.create', '/', async (ctx) => {
  const { email, password } = ctx.request.body;
  const user = await ctx.orm.user.findOne({ where: { email } });

  /* Explain, that usually you encrypt the password,
  so you check if the encrypted input is equal to the actual password */
  const authenticated = (user && password === user.password);
  if (authenticated) {
    ctx.session.currentUserId = user.id;
    ctx.redirect('/');
  } else {
    const error = user ? 'Wrong password' : 'The email is not registered';
    await ctx.render('session/new', {
      error,
      email,
      submitPath: ctx.router.url('session.create'),
    });
  }
});

router.delete('session.destroy', '/', (ctx) => {
  ctx.session.currentUserId = null;
  ctx.redirect('/');
});

module.exports = router;
