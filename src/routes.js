const KoaRouter = require('koa-router');

const index = require('./routes/index');
const artists = require('./routes/artists');

const router = new KoaRouter();

router.use('/', index.routes());
router.use('/artists', artists.routes());

module.exports = router;
