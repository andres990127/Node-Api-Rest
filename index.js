const express = require('express');
const faker = require('faker');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.get('/', (req, res) => {
  console.log('Petición GET recibida');
  console.log(req.query.page);
  res.json({
    "name": "Andrés",
    "body": "Something"
  });
});

app.get('/products/:size', (req, res) => {
  const products = [];
  const limit = req.params.size || 10;
  for (let index = 0; index < limit; index++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl(),
    });
  }
  res.json(products);
});



app.listen(process.env.PORT, () => {
  console.log('Aplicación escuchando por el puerto '+ process.env.PORT);
});
