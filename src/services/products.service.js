import { daoProducts } from "../dao/daoInstance.js";
import { errorStatusMap } from "../utils/errorCodes.js";

class ProductsService {
  async readMany({ limit = 10, page = 1, sort, query }) {
    try {
      const parsedLimit = parseInt(limit);
      const parsedPage = parseInt(page);

      if (
        isNaN(parsedLimit) ||
        isNaN(parsedPage) ||
        parsedLimit <= 0 ||
        parsedPage <= 0
      ) {
        const error = new Error(
          "Los parámetros 'limit' y 'page' deben ser números mayores a 0"
        );
        error.code = errorStatusMap.INCORRECT_DATA;
        throw error;
      }

      const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        lean: true,
        sort:
          sort === "desc"
            ? { price: -1 }
            : sort === "asc"
            ? { price: 1 }
            : null,
      };

      const filter = query ? { category: query } : {};

      return await daoProducts.readMany(filter, options);
    } catch (error) {
      throw new Error(`Error en ProductsService.readMany: ${error}`);
    }
  }

  async readOne(id) {
    try {
      if (!id) {
        const error = new Error("El ID es requerido");
        error.code = errorStatusMap.INCORRECT_DATA;
        throw error;
      }

      const product = await daoProducts.readOne(id);
      if (!product) {
        const error = new Error(
          `No se encontró ningún producto con el ID ${id}`
        );
        error.code = errorStatusMap.NOT_FOUND;
        throw error;
      }
      return product;
    } catch (error) {
      throw error;
    }
  }

  async createOne(product) {
    try {
      if (!product) {
        const error = new Error(
          "No se recibieron datos para crear el producto"
        );
        error.code = errorStatusMap.INCORRECT_DATA;
        throw error;
      }

      const createdProduct = await daoProducts.createOne(product);
      if (!createdProduct) {
        const error = new Error("No se pudo crear el producto");
        error.code = errorStatusMap.UNEXPECTED_ERROR;
        throw error;
      }
      return createdProduct;
    } catch (error) {
      throw error;
    }
  }

  async updateOne(id, updates) {
    try {
      if (!id) {
        const error = new Error("El ID es requerido");
        error.code = errorStatusMap.INCORRECT_DATA;
        throw error;
      }
      if (!updates || Object.keys(updates).length === 0) {
        const error = new Error("No se recibieron datos para actualizar");
        error.code = errorStatusMap.INCORRECT_DATA;
        throw error;
      }
      const updatedProduct = await daoProducts.updateOne(id, updates);
      return updatedProduct;
    } catch (error) {
      throw new Error(`Error en ProductsService.updateOne: ${error}`);
    }
  }

  async deleteOne(id) {
    try {
      if (!id) {
        const error = new Error("El ID es requerido");
        error.code = errorStatusMap.INCORRECT_DATA;
        throw error;
      }
      const deletedProduct = await daoProducts.deleteOne(id);
      return deletedProduct;
    } catch (error) {
      throw error;
    }
  }
}

export const productsService = new ProductsService();
