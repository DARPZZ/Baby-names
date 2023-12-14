import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cors from 'cors';

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));

app.use('/proxy/:year', createProxyMiddleware({ 
  target: 'https://www.navneguiden.dk', 
  changeOrigin: true,
  pathRewrite: {
    '^/proxy/': '/toplister/navne-til-nyfodte/',
  },
}));

app.listen(3000, () => {
  console.log('Proxy server is running on port 3000');
});
