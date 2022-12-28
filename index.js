const express = require('express');
const dotenv = require('dotenv');
const routerApi = require('./routes');

dotenv.config();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

routerApi(app);

app.listen(process.env.PORT, () => {
  console.log('Aplicación escuchando por el puerto '+ process.env.PORT);
});
