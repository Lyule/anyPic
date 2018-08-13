const koa = require('koa')
const router = require('koa-router')()
const request = require('./request');
const cache = require('memory-cache')
const app = new koa()
const mainService = new (require('./service/main'))(app.ctx)

router.get('/', async ctx => {
  ctx.redirect('/anyPic.jpg')
})

router.get('/anyPic.jpg', async ctx => {
  const startDate = new Date()

  let imagesList = cache.get('imagesList')
  if(!imagesList) {
    const result = await mainService.getImagesUri()
    imagesList = result;
    cache.put('imagesList', result)
  }

  const randomNum = Math.floor(Math.random() * imagesList.length)
  const body = await request({ url: imagesList[randomNum].image, encoding: null })

  const endDate = new Date();
  console.log(endDate - startDate)

  ctx.status = 200;
  ctx.type = 'image/jpg';
  ctx.length = Buffer.byteLength(body);
  ctx.body = body;
})

app.use(router.routes())

app.listen(3000, () => {
  console.log('server start')
})