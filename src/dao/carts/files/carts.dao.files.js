import fs from "fs/promises";
import { randomUUID } from "node:crypto";
import { errorStatusMap } from "../../../utils/errorCodes.js";
import { toPOJO, matches } from "../../utils.js";
import { logger } from "../../../utils/logger.js";

export class CartsDaoFiles {
  constructor(path) {
    this.path = path;
  }

  async #readCarts() {
    try {
      const { path } = this;
      const carts = JSON.parse(await fs.readFile(path, "utf-8"));
      return carts;
    } catch (error) {
      const typedError = new Error(
        "#readCarts DAO.FILE Error: ",
        error.code || error
      );
      typedError.code = errorStatusMap.UNEXPECTED_ERROR;
      throw typedError;
    }
  }

  async #writeCarts(carts) {
    try {
      const { path } = this;
      await fs.writeFile(path, JSON.stringify(carts, null, 2));
    } catch (error) {
      const typedError = new Error(
        "#writeCarts DAO.FILE Error: ",
        error.code || error
      );
      typedError.code = errorStatusMap.UNEXPECTED_ERROR;
      throw typedError;
    }
  }

  async createOne() {
    try {
      const newCart = {
        id: randomUUID(),
        products: [],
      };

      const carts = await this.#readCarts();
      carts.push(newCart);

      await this.#writeCarts(carts);

      return newCart;
    } catch (error) {
      logger.error("createOne CARTS.DAO.FILE Error: ", error);
      throw new Error(`Error al crear el carrito: ${error.message}`);
    }
  }

  async readMany() {
    try {
      const carts = await this.#readCarts();
      return carts.map(toPOJO);
    } catch (error) {
      const typedError = new Error(
        `Error al obtener los carritos: ${error.message}`
      );
      typedError.code = errorStatusMap.UNEXPECTED_ERROR;
      throw typedError;
    }
  }

  async readOne(id) {
    try {
      const carts = await this.#readCarts();
      // const cartFound = carts.find((cart) => matches(cart.id, id));
      const cartFound = carts.find((cart) => cart.id === id);
      return cartFound ? toPOJO(cartFound) : null;
    } catch (error) {
      const typedError = new Error(
        `Error al obtener el carrito: ${error.message}`
      );
      typedError.code = errorStatusMap.UNEXPECTED_ERROR;
      throw typedError;
    }
  }

  async updateOne(cartId, productId, quantity) {
    try {
      const carts = await this.#readCarts();
      const cartIndex = carts.findIndex((cart) => cart.id === cartId);

      if (cartIndex === -1) {
        const error = new Error("Carrito no encontrado");
        error.code = errorStatusMap.NOT_FOUND;
        throw error;
      }

      const updatedCart = { ...carts[cartIndex] };
      let existingProductIndex = updatedCart.products.findIndex(
        (product) => product._id === productId
      );

      if (existingProductIndex !== -1) {
        updatedCart.products[existingProductIndex].quantity +=
          parseInt(quantity);

        if (updatedCart.products[existingProductIndex].quantity <= 0) {
          updatedCart.products.splice(existingProductIndex, 1);
        }
      } else {
        if (parseInt(quantity) <= 0) {
          const error = new Error(
            "No se puede agregar un producto con cantidad menor a 0"
          );
          error.code = errorStatusMap.INCORRECT_DATA;
          throw error;
        }

        updatedCart.products.push({ _id: productId, quantity });
      }

      carts[cartIndex] = updatedCart;
      await this.#writeCarts(carts);

      return updatedCart;
    } catch (error) {
      logger.error("addProductToCart CARTS.DAO.FILE Error: ", error);
      throw new Error(
        `Error al agregar el producto al carrito: ${error.message}`
      );
    }
  }
}

const cartManager = new CartsDaoFiles();

export default cartManager;
