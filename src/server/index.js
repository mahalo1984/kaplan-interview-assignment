const Koa = require('koa');
const indexRoutes = require('./router/router');

const app = new Koa();
const PORT = process.env.PORT || 1337;


app.use(async (ctx, next) => {
  try {
    await next();
  }
  catch (err) {
    ctx.status = 400
    ctx.body = `Uh-oh: ${err.message}`
    console.log('Error handler:', err.message);
  }
});

app.use(indexRoutes.routes());

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;
