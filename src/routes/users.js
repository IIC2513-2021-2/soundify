const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.param('id', async (id, ctx, next) => {
  ctx.state.user = await ctx.orm.user.findByPk(id);
  if (!ctx.state.user) return ctx.throw(404);
  return next();
});

router.get('users.new', '/new', async (ctx) => {
  const user = ctx.orm.user.build();
  await ctx.render('users/new', {
    user,
    submitUserPath: ctx.router.url('users.create'),
    usersPath: ctx.router.url('users.list'),
  });
});

router.post('users.create', '/', async (ctx) => {
  const user = ctx.orm.user.build(ctx.request.body);
  try {
    await user.save({ fields: ['firstName', 'lastName', 'email', 'password'] });
    ctx.redirect(ctx.router.url('users.list'));
  } catch (ValidationError) {
    await ctx.render('users/new', {
      user,
      errors: ValidationError.errors,
      submitUserPath: ctx.router.url('users.create'),
      usersPath: ctx.router.url('users.list'),
    });
  }
});

router.get('users.list', '/', async (ctx) => {
  const users = await ctx.orm.user.findAll();
  await ctx.render('users/index', {
    users,
    userPath: (id) => ctx.router.url('users.show', { id }),
    newUserPath: ctx.router.url('users.new'),
  });
});

router.get('users.show', '/:id', async (ctx) => {
  const { user } = ctx.state;
  await ctx.render('users/show', {
    user,
    usersPath: ctx.router.url('users.list'),
  });
});

module.exports = router;
