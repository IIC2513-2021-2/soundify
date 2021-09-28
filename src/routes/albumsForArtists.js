
const KoaRouter = require('koa-router');

const router = new KoaRouter();

async function getArtist(ctx, next){
  ctx.state.artist = await ctx.orm.artist.findByPk(ctx.params.artistId);
  if(!ctx.state.artist) return ctx.throw(404);
  return next();
}


router.get('albums_for_artists.new', '/new', getArtist, async (ctx) => {
  const {artist} = ctx.state;
  const album = ctx.orm.album.build()
  await ctx.render('albums/new_for_artists', {
    album,
    submitAlbumPath: ctx.router.url('albums_for_artists.create', {artistId: artist.id}),
  });
});

router.post('albums_for_artists.create', '/', getArtist, async (ctx) => {
  const {artist} = ctx.state;
  //const album = ctx.orm.album.build(ctx.request.body);
  //album.artistId = artist.id;
  //await album.save({ fields: ['name','artistId', 'publishedAt', 'cover'] });
  await artist.createAlbum(ctx.request.body);
  ctx.redirect(ctx.router.url('artists.show', {id: artist.id}));
});

module.exports = router;
