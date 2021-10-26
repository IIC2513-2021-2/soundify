function checkAuth(ctx, next) {
  const { currentUser } = ctx.state;
  if (!currentUser) {
    ctx.throw(401);
  }
  return next();
}

async function apiSetCurrentUser(ctx, next) {
  const { authData } = ctx.state;
  if (authData) {
    ctx.state.currentUser = await ctx.orm.user.findByPk(authData.sub);
  }
  return next();
}

module.exports = {
  checkAuth,
  apiSetCurrentUser,
};
