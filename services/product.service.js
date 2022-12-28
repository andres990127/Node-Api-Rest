const faker = require('faker');

class ProductService{

  constructor(){
    this.products = [];
    this.generate();
  }

  generate(){
    const limit = 10;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
      });
    }
  }

  create(data){
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    };
    this.products.push(newProduct);
    return newProduct;
  }

  find(){
    return this.products;
  }

  findOne(id){
    return this.products.find((producto) =>{
      return producto.id = id;
    })
  }

  update(id, data){
    const index = this.products.findIndex((producto) =>{
      return producto.id == id;
    });
    console.log(index)
    if(index !== -1){
      const product = this.products[index];
      this.products[index] = {
        ...product,
        ...data
      }
    }else{
      throw new Error('Product not found');
    }
    return this.products[index];
  }

  delete(id){
    const index = this.products.findIndex((producto) =>{
      return producto.id = id;
    });
    if(index !== -1){
      this.products.splice(index, 1);
    }else{
      throw new Error('Product not found');
    }
    return {id};
  }

}

module.exports = ProductService;
