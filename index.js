const Koa = require('koa');
const path = require('path');
const static = require('koa-static');
const proxy = require('koa-better-http-proxy');

const app = new Koa();
const port = process.env.port || 3333;
const staticPath = './dist';
const hostUrl = process.env.hostUrl || 'http://transfer.lian-med.com:9987';

app.use(static(path.join(__dirname, staticPath)));
app.use(proxy(hostUrl), {
  filter: ctx => {
    if (ctx.url.startWith('/api')) {
      return true;
    }
    return false;
  },
});

app.listen(port, () => {
  console.log(`server link is: http://localhost:${port}`);
});
