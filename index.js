const Koa = require('koa');
const path = require('path');
const static = require('koa-static');
const proxy = require('koa2-proxy-middleware');

const app = new Koa();
const port = process.env.port || 3333;
const staticPath = './dist';
const hostUrl = process.env.hostUrl || 'http://transfer.lian-med.com:9988';
const formDescriptionUrl = process.env.formDescriptionUrl || 'http://127.0.0.1:3335';

app.use(static(path.join(__dirname, staticPath)));
const options = {
  targets: {
    '/api/form-descriptions/(.*)': {
      target: formDescriptionUrl,
      changeOrigin: true,
      // pathRewrite: { '^/server': '' },
    },
    // (.*) means anything
    '/api/(.*)': {
      target: hostUrl,
      changeOrigin: true,
    },
  },
};

app.use(proxy(options));

app.listen(port, () => {
  console.log(`apiHostUrl: http://localhost:${hostUrl}, formDescriptionUrl: ${formDescriptionUrl}`);
  console.log(`server link is: http://localhost:${port}`);
});
