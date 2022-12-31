const express = require('express');
const dotenv = require('dotenv');
const routerApi = require('../routes');
const { logErrors, errorHandler, boomErrorHandler } = require('../middlewares/error.handler');

dotenv.config();

const app = express();
app.use(express.json());
routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(process.env.PORT, () => {
  console.log('Aplicación escuchando por el puerto '+ process.env.PORT);
});
