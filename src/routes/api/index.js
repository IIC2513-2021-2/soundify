const KoaRouter = require('koa-router');
const artists = require('./artists');

const router = new KoaRouter({ prefix: '/api' });

router.use('/artists', artists.routes());

module.exports = router;
