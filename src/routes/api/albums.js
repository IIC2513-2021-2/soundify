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

module.exports = router;
