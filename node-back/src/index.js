import express from 'express';
import boot from './boot';
import routes from './routes';


const app = express();
const port = process.env.PORT || '3000';
const host = process.env.HOST || '127.0.0.1';

boot(app);

app.use(routes);

app.listen(port, host, function () {
  console.log(`Server run on ${host}:${port}`);
});
