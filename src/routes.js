const KoaRouter = require('koa-router');

const index = require('./routes/index');
const artists = require('./routes/artists');
const albums = require('./routes/albums');

const router = new KoaRouter();

router.use('/', index.routes());
router.use('/artists', artists.routes());
router.use('/albums', albums.routes());


module.exports = router;
