const KoaRouter = require('koa-router');
const JSONAPISerializer = require('jsonapi-serializer').Serializer;

const ArtistSerializer = new JSONAPISerializer('artists', {
  attributes: ['name', 'origin', 'genres', 'formedAt', 'members'],
  keyForAttribute: 'camelCase',
});

const router = new KoaRouter();

router.param('id', async (id, ctx, next) => {
  ctx.state.artist = await ctx.orm.artist.findByPk(id);
  if (!ctx.state.artist) {
    return ctx.throw(404, "The artist you are looking for doesn't exists");
  }
  return next();
});

router.get('api.artists.list', '/', async (ctx) => {
  const artists = await ctx.orm.artist.findAll();
  ctx.body = ArtistSerializer.serialize(artists);
});

router.get('api.artists.show', '/:id', async (ctx) => {
  const { artist } = ctx.state;
  ctx.body = ArtistSerializer.serialize(artist);
});

router.post('api.artists.create', '/', async (ctx) => {
  try {
    const artist = await ctx.orm.artist.build(ctx.request.body);
    await artist.save();
    ctx.body = ArtistSerializer.serialize(artist);
    ctx.status = 201;
  } catch (ValidationError) {
    ctx.throw(400);
  }
});

module.exports = router;
