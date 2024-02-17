import { faker } from "@faker-js/faker/locale/es";
function createProductMock() {
  return {
    _id: faker.database.mongodbObjectId(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    thumbnail: [faker.image.avatar()],
    code: faker.string.alphanumeric,
    status: faker.datatype.boolean(),
    stock: faker.number.int({ min: 1, max: 1000 }),
    category: faker.commerce.department(),
    timestamp: faker.date.recent(),
  };
}

export class ProductsDaoMock {
  constructor() {
    this.products = Array.from({ length: 100 }, createProductMock);
  }

  async getProducts() {
    return this.products;
  }

  async getProductById(id) {
    return this.products.find((product) => product._id === id);
  }

  async createProduct(product) {
    const newProduct = createProductMock();
    this.products.push(newProduct);
    return newProduct;
  }

  async updateProduct(id, product) {
    const index = this.products.findIndex((product) => product._id === id);
    if (index === -1) {
      return null;
    }
    this.products[index] = { ...product, _id: id };
    return this.products[index];
  }

  async deleteProduct(id) {
    const index = this.products.findIndex((product) => product._id === id);
    if (index === -1) {
      return null;
    }
    const product = this.products[index];
    this.products.splice(index, 1);
    return product;
  }
}
