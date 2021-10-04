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
  so you check if the input one encripted its equal to the actual one */
  const authenticated = (user && password === user.password);
  if (user && authenticated) {
      ctx.session.currentUserId = user.id;
      ctx.redirect('/');
  } else if (!user) {
    await ctx.render('session/new', {
      error: 'Email no registrado',
      email,
      submitPath: ctx.router.url('session.create'),
    });
  } else {
    await ctx.render('session/new', {
      error: 'Contraseña incorrecta',
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
