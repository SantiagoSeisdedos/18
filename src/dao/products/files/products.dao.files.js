import fs from "fs/promises";
import { Product } from "./products.model.files.js";
import { matches, toPOJO } from "../../utils.js";
import { errorStatusMap } from "../../../utils/errorCodes.js";

export class ProductsDaoFiles {
  constructor(path) {
    this.path = path;
  }

  async #readProducts(limit, sortKey) {
    try {
      const { path } = this;
      let productsList = JSON.parse(await fs.readFile(path, "utf-8"));
      if (sortKey) {
        productsList = productsList.sort((a, b) => a[sortKey] - b[sortKey]);
      }
      return limit ? productsList.slice(0, limit) : productsList;
    } catch (error) {
      console.error("#readProducts DAO.FILE Error: ", error.code || error);
      throw new Error("Error reading products");
    }
  }

  async #writeProducts(products) {
    try {
      const { path } = this;
      await fs.writeFile(path, JSON.stringify(products, null, 2));
    } catch (error) {
      console.error("#writeProducts DAO.FILE Error: ", error.code || error);
      throw new Error("Error writing products");
    }
  }

  async createOne(data) {
    try {
      if (!data.title || !data.price) {
        const error = new Error("Title and price are required");
        error.code = errorStatusMap.INCORRECT_DATA;
        throw error;
      }

      const product = new Product(data);
      const productPojo = product.toPOJO();
      const products = await this.#readProducts();

      // Check if the product code already exists
      const isCodeExists = products.some((p) => p.code === productPojo.code);
      if (isCodeExists) {
        const error = new Error("Product code already exists");
        error.code = errorStatusMap.DUPLICATED_KEY;
        throw error;
      }

      products.push(productPojo);
      await this.#writeProducts(products);
      return productPojo;
    } catch (error) {
      throw error;
    }
  }

  async readOne(id) {
    try {
      const { path } = this;
      let productsList = JSON.parse(await fs.readFile(path, "utf-8"));
      const productFound = productsList.find((product) => product._id === id);
      return productFound ? toPOJO(productFound) : null;
    } catch (error) {
      throw new Error("Error reading product");
    }
  }

  async readMany(filter, options) {
    const { page, limit, sort } = options;
    const products = await this.#readProducts();
    let filteredProducts = products.filter(matches(filter));

    if (sort) {
      filteredProducts = filteredProducts.sort((a, b) => a[sort] - b[sort]);
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    return paginatedProducts.map(toPOJO);
  }

  async updateOne(query, updates) {
    const products = await this.#readProducts();
    const productIndex = products.findIndex(matches(query));

    if (productIndex !== -1) {
      const product = new Product({ ...products[productIndex], ...updates });
      products[productIndex] = product.toPOJO();
      await this.#writeProducts(products);
      return product.toPOJO();
    } else {
      throw new Error("Producto no encontrado");
    }
  }

  async updateMany(query, updates) {
    const products = await this.#readProducts();
    const productsToUpdate = products.filter(matches(query));
    productsToUpdate.forEach((product) => {
      const productIndex = products.findIndex((p) => p._id === product._id);
      products[productIndex] = new Product({ ...product, ...updates }).toPOJO();
    });
    await this.#writeProducts(products);
    return productsToUpdate.map((product) =>
      new Product({ ...product, ...updates }).toPOJO()
    );
  }

  async deleteOne(id) {
    const products = await this.#readProducts();
    const productIndex = products.findIndex((product) => product._id === id);

    if (productIndex !== -1) {
      const product = products[productIndex];
      products.splice(productIndex, 1);
      await this.#writeProducts(products);
      return toPOJO(product);
    } else {
      const error = new Error("Producto no encontrado");
      error.code = errorStatusMap.NOT_FOUND;
      throw error;
    }
  }

  async deleteMany(query) {
    const products = await this.#readProducts();
    const productsToDelete = products.filter(matches(query));
    productsToDelete.forEach((product) => {
      const productIndex = products.findIndex((p) => p._id === product._id);
      products.splice(productIndex, 1);
    });
    await this.#writeProducts(products);
    return productsToDelete.map(toPOJO);
  }
}
