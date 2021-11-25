const KoaRouter = require('koa-router');
const JSONAPISerializer = require('jsonapi-serializer').Serializer;

const AlbumSerializer = new JSONAPISerializer('albums', {
  attributes: ['artistId', 'name', 'publishedAt', 'cover'],
  keyForAttribute: 'camelCase',
});

const router = new KoaRouter();

router.param('id', async (id, ctx, next) => {
  ctx.state.album = await ctx.orm.album.findByPk(id);
  if (!ctx.state.album) {
    return ctx.throw(404, "The album you are looking for doesn't exist");
  }
  return next();
});

router.get('api.albums.index', '/', async (ctx) => {
  const albums = await ctx.orm.album.findAll();
  ctx.body = AlbumSerializer.serialize(albums);
});

router.get('api.albums.show', '/:id', async (ctx) => {
  const { album } = ctx.state;
  const artist = await album.getArtist();
  ctx.body = AlbumSerializer.serialize(album);
  ctx.body.data.attributes.artist = artist.name;
});

router.post('api.albums.create', '/', async (ctx) => {
  try {
    const album = ctx.orm.album.build(ctx.request.body);
    await album.save({ fields: ['name', 'artistId', 'publishedAt', 'cover'] });
    ctx.body = AlbumSerializer.serialize(album);
    ctx.status = 201;
  } catch (ValidationError) {
    ctx.throw(400);
  }
});

router.patch('api.albums.update', '/:id', async (ctx) => {
  const { cloudinary } = ctx.state;
  try {
    const album = await ctx.orm.album.findByPk(ctx.params.id);
    const { cover } = ctx.request.files;
    if (cover.size > 0) {
      const imageUrl = await cloudinary.uploader.upload(cover.path);
      ctx.request.body.cover = imageUrl.url;
    }
    await album.update(ctx.request.body, { fields: ['name', 'artistId', 'publishedAt', 'cover'] });
    ctx.body = AlbumSerializer.serialize(album);
  } catch (ValidationError) {
    ctx.throw(400, 'Bad request');
  }
});

module.exports = router;
