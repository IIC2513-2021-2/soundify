const KoaRouter = require('koa-router');
const JSONAPISerializer = require('jsonapi-serializer').Serializer;
const sendRegistrationEmail = require('../../mailers/registration');

const UserSerializer = new JSONAPISerializer('users', {
  attributes: ['firstName', 'lastName', 'email'],
  keyForAttribute: 'camelCase',
});

const router = new KoaRouter();

router.post('users.api.create', '/', async (ctx) => {
  const user = ctx.orm.user.build(ctx.request.body);
  try {
    await user.save({ fields: ['firstName', 'lastName', 'email', 'password'] });
    await sendRegistrationEmail(user);
    ctx.body = UserSerializer.serialize(user);
    ctx.status = 201;
  } catch (ValidationError) {
    ctx.throw(400);
  }
});

module.exports = router;
