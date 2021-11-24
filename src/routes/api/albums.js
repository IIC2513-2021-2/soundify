const KoaRouter = require('koa-router');
const JSONAPISerializer = require('jsonapi-serializer').Serializer;

const AlbumSerializer = new JSONAPISerializer('albums', {
  attributes: ['artistId', 'name', 'publishedAt', 'cover'],
  keyForAttribute: 'camelCase',
});

const router = new KoaRouter();

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
    console.log(ValidationError);
    ctx.throw(400, 'Bad request');
  }
});

module.exports = router;
